/* eslint-disable */
const { format } = require('prettier');
const fetch = require('node-fetch');
const fs = require('fs');
const {
  getIntrospectionQuery,
  buildClientSchema,
  printSchema,
} = require('graphql/utilities');

/**
 * 从指定 endpoint 提取 schema
 *
 * @param {Object} opts - 参数对象
 * @param {String} opts.endpoint - graphql endpoint
 * @param {String} opts.schemaFile - 输出 schema 的文件，该文件会作为 schema 拉取失败时的后备提供
 * @param {Object} [opts.headers={}] - 自定义 headers ，如可用于 header 设置认证
 */
async function fetchSchema({ endpoint, schemaFile, headers }) {
  try {
    const { data, errors } = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({
        operationName: 'IntrospectionQuery',
        query: getIntrospectionQuery(),
        variables: {},
      }),
    }).then((res) => res.json());
    if (errors) {
      console.warn('响应错误', errors);
      throw new Error('响应错误');
    } else {
      const schema = buildClientSchema(data);
      return printSchema(schema);
    }
  } catch (err) {
    console.warn('拉取 schema 出错', err);
    if (schemaFile && fs.existsSync(schemaFile)) {
      console.info(`使用本地 ${schemaFile}`);
      return fs.readFileSync(schemaFile, 'utf8');
    }
    throw err;
  }
}

const endpoint =
  process.env.GRAPHQL_ENDPOINT || 'http://localhost:7000/graphql';
// 'https://ininderprint-backend-nestjs.cloud-dev.ininderprint.tw/admin-api/graphql';
const schemaPath = './src/graphql/schemas/schema.graphql';

function fix(schema) {
  return schema.replace(/(ISO8601Date = )".*?"/g, `$1 "2020-01-01"`);
}

fetchSchema({ endpoint }).then((schema) => {
  fs.writeFileSync(schemaPath, format(fix(schema), { parser: 'graphql' }));
});
