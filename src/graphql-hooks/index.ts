import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** Cursor for paging through collections */
  ConnectionCursor: { input: any; output: any };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: string; output: string };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
};

/** 創建門店店休日期Input */
export type AddVendorHolidayInput = {
  /** 該門店所在時區的日期 */
  date: Scalars['String']['input'];
  /** 該店休日期備註 */
  note: Scalars['String']['input'];
  /** 門店ID */
  vendorId: Scalars['String']['input'];
};

/** 創建門店營業時間Input */
export type AddVendorOpeningHourInput = {
  /** Day of Week(0~6). 0是禮拜天, 6是禮拜六 */
  dayOfWeek: Scalars['Int']['input'];
  /** 該營業時段結束時間(門店本地時區時間) */
  endTime: Scalars['String']['input'];
  /** 該營業時段備註 */
  note: Scalars['String']['input'];
  /** 該營業時段開始時間(門店本地時區時間) */
  startTime: Scalars['String']['input'];
  /** 門店ID */
  vendorId: Scalars['String']['input'];
};

export type AddVendorPricingInput = {
  media: MediaSize;
  /** 列印(輸出)色彩模式；彩色(COLOR)/黑白(MONOCHROME) */
  print_color_mode: Print_Color_Mode_Enum;
  /** 門店的價格的服務 */
  service: MerchantVendorService;
  /** 該服務之單價 */
  unit_price: Scalars['Float']['input'];
};

export type Address = {
  __typename?: 'Address';
  /** 地址 */
  address: Scalars['String']['output'];
  /** 城市；ex. 台北 */
  city: Scalars['String']['output'];
  /** 鄉鎮市區 */
  dist: Scalars['String']['output'];
};

export type AddressBook = {
  __typename?: 'AddressBook';
  /** 城市 */
  city: Scalars['String']['output'];
  /** 詳細地址 */
  details?: Maybe<Scalars['String']['output']>;
  /** 區域 */
  district: Scalars['String']['output'];
  /** AddressBook ID */
  id: Scalars['String']['output'];
  /** 省份 */
  province?: Maybe<Scalars['String']['output']>;
  /** 收件人姓名 */
  recipientName: Scalars['String']['output'];
  /** 收件人电话 */
  recipientPhone: Scalars['String']['output'];
  /** 路名 */
  street: Scalars['String']['output'];
  /** 关联用户 */
  user: UserEntity;
};

export type AddressInput = {
  /** 地址 */
  address: Scalars['String']['input'];
  /** 城市；ex. 台北 */
  city: Scalars['String']['input'];
  /** 鄉鎮市區 */
  dist: Scalars['String']['input'];
};

export type BindLineReqDto = {
  /** Line Login或LIFF之用戶Access Token */
  access_token: Scalars['String']['input'];
};

export type BindResDto = {
  __typename?: 'BindResDto';
  result: Scalars['Boolean']['output'];
};

export type BluetoothInterface = {
  __typename?: 'BluetoothInterface';
  /** 蓝牙接口支持的协议 */
  supportedProtocols?: Maybe<Scalars['String']['output']>;
  /** 蓝牙接口的版本号 */
  version?: Maybe<Scalars['String']['output']>;
};

/** 裝訂方式 */
export enum BookBindingMethodEnum {
  /** 無需裝訂 */
  None = 'NONE',
  /** 膠裝 */
  PerfectBinding = 'PERFECT_BINDING',
}

export type BoolResDto = {
  __typename?: 'BoolResDto';
  result: Scalars['Boolean']['output'];
};

export type CarrierData = {
  __typename?: 'CarrierData';
  /** 載具號碼；當載具類別[CarrierType]="1"(綠界科技電子發票載具)時，請帶空字串；當載具類別[CarrierType]="2"(買受人之自然人憑證)時，則請帶固定長度為 16 且格式為 2碼大寫英文字母加上 14 碼數字；當載具類別[CarrierType]="3"(買受人之手機條碼)時，則請帶固定長度為 8 且格式為 1 碼斜線「/」加上 7 碼由數字及大寫英文字母及+-.符號組成的字串 */
  carrierNumber: Scalars['String']['output'];
  /** 載具類別(1: 會員載具, 2: 自然人憑證, 3: 手機條碼) */
  carrierType: Scalars['String']['output'];
};

export type Contact = {
  __typename?: 'Contact';
  /** 聯絡人姓名 */
  name: Scalars['String']['output'];
  /** 聯絡電話 */
  phoneNumber: Scalars['String']['output'];
};

export type ContactInput = {
  /** 聯絡人姓名 */
  name: Scalars['String']['input'];
  /** 聯絡電話 */
  phoneNumber: Scalars['String']['input'];
};

/** 物流商 */
export enum Courier {
  /** 已送达 */
  Delivered = 'Delivered',
  /** 运输中 */
  InTransit = 'In_Transit',
  /** 待处理 */
  Pending = 'Pending',
  /** 已退回 */
  Returned = 'Returned',
}

export type CreateDeviceInput = {
  /** 雲打印盒。當創建類型為雲打印盒時，該欄位為必填 */
  printBox?: InputMaybe<UpsertPrintBoxInput>;
  /** 印表機。當創建類型為印表機時，該欄位為必填 */
  printer?: InputMaybe<UpsertPrinterInput>;
  /** 路由器。當創建類型為路由器時，該欄位為必填 */
  router?: InputMaybe<UpsertRouterInput>;
  /** 欲創建的裝置類型 */
  type: DeviceType;
};

export type CreateFacilityReqDto = {
  administrator_uuid: Scalars['String']['input'];
  name: Scalars['String']['input'];
  type_uuid: Scalars['String']['input'];
  vendor_uuid: Scalars['String']['input'];
};

export type CreateFacilityTypeReqInput = {
  /** 设备类型名称 */
  name: Scalars['String']['input'];
};

export type CreateMerchantReqDto = {
  /** 地址 */
  address?: InputMaybe<AddressInput>;
  /** 银行账号 */
  bankAccount?: InputMaybe<Scalars['String']['input']>;
  /** 银行名称 */
  bankName?: InputMaybe<Scalars['String']['input']>;
  /** 商户名称 */
  name: Scalars['String']['input'];
  /** 商户状态 */
  status: MerchantStatus;
  /** 公司统一编号 */
  taxIdentifier: Scalars['String']['input'];
  /** 商户类型 */
  type: MerchantType;
};

export type CreateMerchantVendorReqDto = {
  address: AddressInput;
  contacts: ContactInput;
  /** 與用戶坐標之距離 */
  distance?: InputMaybe<Scalars['Float']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  location: PostGisGeographyInput;
  merchantUuid: Scalars['String']['input'];
  /** 门店名称 */
  name: Scalars['String']['input'];
  /** 是否為網路門店 */
  online: Scalars['Boolean']['input'];
  pricing: Array<CreateVendorPricingInput>;
  /** 時區 */
  timezone: Scalars['String']['input'];
  zipCode: Scalars['String']['input'];
};

export type CreateVendorPricingInput = {
  media: MediaSize;
  /** 列印(輸出)色彩模式；彩色(COLOR)/黑白(MONOCHROME) */
  print_color_mode: Print_Color_Mode_Enum;
  /** 門店的價格的服務 */
  service: MerchantVendorService;
  /** 該服務之單價 */
  unit_price: Scalars['Float']['input'];
};

export type CursorPaging = {
  /** Paginate after opaque cursor */
  after?: InputMaybe<Scalars['ConnectionCursor']['input']>;
  /** Paginate before opaque cursor */
  before?: InputMaybe<Scalars['ConnectionCursor']['input']>;
  /** Paginate first */
  first?: InputMaybe<Scalars['Int']['input']>;
  /** Paginate last */
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type CustomerAddress = {
  __typename?: 'CustomerAddress';
  city: Scalars['String']['output'];
  detailedAddressLine: Scalars['String']['output'];
  district: Scalars['String']['output'];
  street: Scalars['String']['output'];
};

export type CustomerData = {
  __typename?: 'CustomerData';
  /** 地址(如『106 台北市南港區發票一街 1 號 1 樓』) */
  customerAddress: CustomerAddress;
  /** Email地址(電子紙本寄送之Email) */
  customerEmail: Scalars['String']['output'];
  customerIdentifier: Scalars['String']['output'];
  /** 客戶名稱(若有輸入統編則為公司名稱) */
  customerName: Scalars['String']['output'];
  /** 電話(選填) */
  customerPhone: Scalars['String']['output'];
};

export type Device = {
  __typename?: 'Device';
  /** 裝置已連接的介面/接口(USB, Ethernet...等) */
  connectedInterfaces?: Maybe<Array<DeviceInterface>>;
  /** 所屬設備 */
  facility?: Maybe<FacilityEntity>;
  /** 設備ID */
  facilityId?: Maybe<Scalars['String']['output']>;
  /** 裝置ID (UUID) */
  id?: Maybe<Scalars['ID']['output']>;
  /** 裝置的介面/接口(USB, Ethernet...等) */
  interfaces?: Maybe<Array<DeviceInterface>>;
  /** 裝置型號 */
  model?: Maybe<DeviceModel>;
  /** 裝置名稱 */
  name?: Maybe<Scalars['String']['output']>;
  params?: Maybe<Array<Scalars['String']['output']>>;
  /** 装置序列号 */
  serialNumber?: Maybe<Scalars['String']['output']>;
  /** SNMP Host/IP(當該裝置支持透過SNMP監控時) */
  snmpMonitoringHost?: Maybe<Scalars['String']['output']>;
  /** SNMP Port(當該裝置支持透過SNMP監控時) */
  snmpMonitoringPort?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<DeviceStatus>;
  statusDetails?: Maybe<Scalars['String']['output']>;
  /** 设备类型 */
  type: DeviceType;
  type_deprecated?: Maybe<DeviceTypeEntity>;
};

export type DeviceInterface = {
  __typename?: 'DeviceInterface';
  data?: Maybe<DeviceInterfaceTypeDataUnion>;
  /** 介面/端口名稱 */
  name: Scalars['String']['output'];
  /** 介面種類 */
  type: DeviceInterfaceType;
};

/** 裝置介面類型 */
export enum DeviceInterfaceType {
  /** 藍芽 */
  Bluetooth = 'Bluetooth',
  /** 乙太網 */
  Ethernet = 'Ethernet',
  /** 序列端口 */
  Serial = 'Serial',
  /** USB */
  Usb = 'USB',
  /** WiFi */
  WiFi = 'WiFi',
}

export type DeviceInterfaceTypeDataUnion =
  | BluetoothInterface
  | EthernetInterface
  | SerialInterface
  | UsbInterface
  | WiFiInterface;

export type DeviceModel = {
  __typename?: 'DeviceModel';
  /** 該型號裝置 */
  devices?: Maybe<Array<Device>>;
  /** 裝置ID (UUID) */
  id?: Maybe<Scalars['ID']['output']>;
  /** 裝置製造商 */
  manufacture: Scalars['String']['output'];
  model: Scalars['String']['output'];
};

/** 裝置狀態 */
export enum DeviceStatus {
  /** 異常 */
  Abnormal = 'Abnormal',
  /** 正常 */
  Normal = 'Normal',
}

/** 裝置種類 */
export enum DeviceType {
  /** 雲打印盒 */
  PrintBox = 'PrintBox',
  /** 印表機 */
  Printer = 'Printer',
  /** 路由器 */
  Router = 'Router',
}

export type DeviceTypeEntity = {
  __typename?: 'DeviceTypeEntity';
  /** 裝置類型名稱 */
  name: Scalars['String']['output'];
};

export type DeviceTypeInput = {
  /** 裝置類型名稱 */
  name: Scalars['String']['input'];
};

export type DeviceUnion = Device | PrintBox | Printer;

export type DocumentEntity = {
  __typename?: 'DocumentEntity';
  /** Document之各類型File數據 */
  documentFiles?: Maybe<Array<DocumentFileEntity>>;
  expiredAt: Scalars['DateTime']['output'];
  /** 檔名(用戶上傳文件原文件) */
  filename: Scalars['String']['output'];
  /** 用戶上傳文檔總頁數；以轉換後之文件為基準，故需process完畢才會有該值 */
  pages?: Maybe<Scalars['Int']['output']>;
  /** 文檔處理失敗錯誤訊息 */
  processFailedMessage?: Maybe<Scalars['String']['output']>;
  /** Document處理流程狀態 */
  processStatus: DocumentProcessStatus;
  /** Document提交方式 */
  submittedThrough?: Maybe<DocumentSubmittedThroughEnum>;
  userUuid: Scalars['String']['output'];
  uuid: Scalars['ID']['output'];
};

export type DocumentFileEntity = {
  __typename?: 'DocumentFileEntity';
  bucketName?: Maybe<Scalars['String']['output']>;
  contentType?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deletedOnBucket?: Maybe<Scalars['Boolean']['output']>;
  document_uuid: Scalars['String']['output'];
  path?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  type: DocumentFileType;
  uuid: Scalars['ID']['output'];
};

export enum DocumentFileType {
  Original = 'ORIGINAL',
  Preview = 'PREVIEW',
  Print = 'PRINT',
}

export enum DocumentProcessStatus {
  Converted = 'CONVERTED',
  Converting = 'CONVERTING',
  Failed = 'FAILED',
  Finished = 'FINISHED',
  Uploaded = 'UPLOADED',
  WaitingForUploading = 'WAITING_FOR_UPLOADING',
  Watermarked = 'WATERMARKED',
  Watermarking = 'WATERMARKING',
}

/** 文件提交方式 */
export enum DocumentSubmittedThroughEnum {
  /** 上傳 */
  Upload = 'UPLOAD',
  /** job绑定了order(已下單) */
  VirtualPrinter = 'VIRTUAL_PRINTER',
}

export type DonationData = {
  __typename?: 'DonationData';
  loveCode: Scalars['String']['output'];
};

export type EthernetInterface = {
  __typename?: 'EthernetInterface';
  /** 以太网接口的 IP 地址 */
  ip?: Maybe<Scalars['String']['output']>;
  /** 以太网接口的 MAC 地址 */
  macAddress?: Maybe<Scalars['String']['output']>;
};

export type FacilityEntity = {
  __typename?: 'FacilityEntity';
  accessKey: Scalars['String']['output'];
  accessSecret: Scalars['String']['output'];
  administrator: UserEntity;
  administratorUuid: Scalars['String']['output'];
  /** 該設備下的裝置 */
  devices?: Maybe<Array<DeviceUnion>>;
  name: Scalars['String']['output'];
  status: FacilityStatus;
  /** 設備狀態詳細描述 */
  statusDetails?: Maybe<Scalars['String']['output']>;
  type: FacilityTypeEntity;
  typeUuid: Scalars['String']['output'];
  uuid: Scalars['ID']['output'];
  vendor: MerchantVendorEntity;
  vendorUuid: Scalars['String']['output'];
};

/** 設備狀態 */
export enum FacilityStatus {
  /** 異常 */
  Abnormal = 'Abnormal',
  /** 維護中 */
  Maintain = 'Maintain',
  /** 正常 */
  Normal = 'Normal',
}

export type FacilityTypeEntity = {
  __typename?: 'FacilityTypeEntity';
  /** 设备类型名称 */
  name: Scalars['String']['output'];
  uuid: Scalars['ID']['output'];
};

export type GetDeviceListByFacilityUuidResDto = {
  __typename?: 'GetDeviceListByFacilityUuidResDto';
  created_at: Scalars['String']['output'];
  model: GetDeviceListByFacilityUuidResDtoModel;
  name: Scalars['String']['output'];
  params: Array<Scalars['String']['output']>;
  serial_number: Scalars['String']['output'];
  status: DeviceStatus;
  status_details: Scalars['String']['output'];
  type: GetDeviceListByFacilityUuidResDtoType;
  uuid: Scalars['ID']['output'];
};

export type GetDeviceListByFacilityUuidResDtoModel = {
  __typename?: 'GetDeviceListByFacilityUuidResDtoModel';
  manufacture: Scalars['String']['output'];
  model: Scalars['String']['output'];
  uuid: Scalars['ID']['output'];
};

export type GetDeviceListByFacilityUuidResDtoType = {
  __typename?: 'GetDeviceListByFacilityUuidResDtoType';
  name: Scalars['String']['output'];
};

export type GetFacilityInfoResDto = {
  __typename?: 'GetFacilityInfoResDto';
  access_key: Scalars['String']['output'];
  access_secret: Scalars['String']['output'];
  administrator: GetFacilityInfoResDtoAdministrator;
  created_at: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: FacilityStatus;
  status_details: Scalars['String']['output'];
  type: GetFacilityInfoResDtoType;
  vendor: GetFacilityInfoResDtoVendor;
};

export type GetFacilityInfoResDtoAdministrator = {
  __typename?: 'GetFacilityInfoResDtoAdministrator';
  profile: GetFacilityInfoResDtoAdministratorProfile;
  uuid: Scalars['ID']['output'];
};

export type GetFacilityInfoResDtoAdministratorProfile = {
  __typename?: 'GetFacilityInfoResDtoAdministratorProfile';
  avatar: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  gender: UserGender;
  last_name: Scalars['String']['output'];
  nickname: Scalars['String']['output'];
};

export type GetFacilityInfoResDtoType = {
  __typename?: 'GetFacilityInfoResDtoType';
  name: Scalars['String']['output'];
  uuid: Scalars['ID']['output'];
};

export type GetFacilityInfoResDtoVendor = {
  __typename?: 'GetFacilityInfoResDtoVendor';
  address: Address;
  location: GetFacilityInfoResDtoVendorLocation;
  name: Scalars['String']['output'];
  uuid: Scalars['ID']['output'];
};

export type GetFacilityInfoResDtoVendorLocation = {
  __typename?: 'GetFacilityInfoResDtoVendorLocation';
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type GetFacilityListResDto = {
  __typename?: 'GetFacilityListResDto';
  data: Array<GetFacilityListResDtoItem>;
  total_count: Scalars['Int']['output'];
};

export type GetFacilityListResDtoItem = {
  __typename?: 'GetFacilityListResDtoItem';
  access_key: Scalars['String']['output'];
  access_secret: Scalars['String']['output'];
  administrator: GetFacilityListResDtoItemAdministrator;
  created_at: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: FacilityStatus;
  status_details: Scalars['String']['output'];
  type: GetFacilityListResDtoItemType;
  uuid: Scalars['ID']['output'];
  vendor: GetFacilityListResDtoItemVendor;
};

export type GetFacilityListResDtoItemAdministrator = {
  __typename?: 'GetFacilityListResDtoItemAdministrator';
  profile: GetFacilityListResDtoItemAdministratorProfile;
  uuid: Scalars['ID']['output'];
};

export type GetFacilityListResDtoItemAdministratorProfile = {
  __typename?: 'GetFacilityListResDtoItemAdministratorProfile';
  avatar: UserGender;
  first_name: Scalars['String']['output'];
  gender: UserGender;
  last_name: Scalars['String']['output'];
  nickname: Scalars['String']['output'];
};

export type GetFacilityListResDtoItemType = {
  __typename?: 'GetFacilityListResDtoItemType';
  name: Scalars['String']['output'];
  uuid: Scalars['ID']['output'];
};

export type GetFacilityListResDtoItemVendor = {
  __typename?: 'GetFacilityListResDtoItemVendor';
  address: Address;
  location: GetFacilityListResDtoItemVendorLocation;
  name: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
};

export type GetFacilityListResDtoItemVendorLocation = {
  __typename?: 'GetFacilityListResDtoItemVendorLocation';
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type IppJobOperation = {
  __typename?: 'IppJobOperation';
  /** IPP Logs */
  logs?: Maybe<Array<IppJobOperationLog>>;
  /** Job UUID */
  uuid?: Maybe<Scalars['ID']['output']>;
};

export type IppJobOperationLog = {
  __typename?: 'IppJobOperationLog';
  /** 該Log所屬之operation */
  operation: IppJobOperation;
  /** IPP Client發送之請求 */
  request?: Maybe<Scalars['JSON']['output']>;
  /** IPP Client收到之Response */
  response: Scalars['JSON']['output'];
  /** IPP發送之請求的Operation Type */
  type: IppJobOperationTypeEnum;
  /** Ipp Job Operation Log UUID */
  uuid?: Maybe<Scalars['ID']['output']>;
};

/** IPP Operation Type */
export enum IppJobOperationTypeEnum {
  /** 獲取Job參數 */
  GetJobAttributes = 'Get_Job_Attributes',
  /** 獲取打印機參數 */
  GetPrinterAttributes = 'Get_Printer_Attributes',
  /** 打印任務 */
  PrintJob = 'Print_Job',
}

/** 開立方式(載具/電子紙本) */
export enum IssueMethod {
  /** 載具(手機條碼/自然人憑證/會員載具等) */
  Carrier = 'CARRIER',
  /** 電子紙本 */
  DigitalPrint = 'DIGITAL_PRINT',
  /** 無(捐贈無需開立方式) */
  None = 'NONE',
}

/** 開立至對象(個人、公司、捐贈) */
export enum IssueTo {
  /** 公司 */
  Company = 'COMPANY',
  /** 捐贈 */
  Donate = 'DONATE',
  /** 個人 */
  Individual = 'INDIVIDUAL',
}

export type JobEntity = {
  __typename?: 'JobEntity';
  configuration: PrintConfiguration;
  /** 文檔 */
  document: DocumentEntity;
  /** 錯誤訊息 */
  errorMessage?: Maybe<Scalars['String']['output']>;
  /** 所属訂單uuid */
  orderId: Scalars['ID']['output'];
  /** 總共輸出頁數數量。由後端計算 */
  quantity?: Maybe<Scalars['Int']['output']>;
  state: JobState;
  /** Job(任務)類型 */
  type: JobType;
  /** Job UUID */
  uuid?: Maybe<Scalars['ID']['output']>;
};

/** 打印任務狀態 */
export enum JobState {
  /** job 打印失败 */
  Failed = 'FAILED',
  /** job 打印完成 */
  Finished = 'FINISHED',
  Making = 'MAKING',
  /** job绑定了order(已下單) */
  Ordered = 'ORDERED',
  /** 用户创建了 job */
  Submitted = 'SUBMITTED',
}

/** 任務類型 */
export enum JobType {
  /** 打印類型任務 */
  Print = 'PRINT',
}

export type LoginReqDto = {
  credential: Scalars['String']['input'];
  identifier: Scalars['String']['input'];
  identity_type: UserIdentityType;
};

export type LoginResDto = {
  __typename?: 'LoginResDto';
  expires_in: Scalars['Int']['output'];
  token: Scalars['String']['output'];
};

export enum MediaSize {
  /** A3 */
  A3 = 'A3',
  /** A4 */
  A4 = 'A4',
  A5 = 'A5',
}

export type MerchantContactsEntity = {
  __typename?: 'MerchantContactsEntity';
  email: Scalars['String']['output'];
  merchantUuid: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  uuid: Scalars['ID']['output'];
};

export type MerchantEntity = {
  __typename?: 'MerchantEntity';
  /** 地址 */
  address?: Maybe<Address>;
  /** 银行账号 */
  bankAccount?: Maybe<Scalars['String']['output']>;
  /** 银行名称 */
  bankName?: Maybe<Scalars['String']['output']>;
  /** 商戶聯絡人 */
  contacts: Array<MerchantContactsEntity>;
  /** 商户名称 */
  name: Scalars['String']['output'];
  /** 商户状态 */
  status: MerchantStatus;
  /** 公司统一编号 */
  taxIdentifier: Scalars['String']['output'];
  /** 商户类型 */
  type: MerchantType;
  uuid: Scalars['ID']['output'];
  /** 該商戶之門店列表 */
  vendors: Array<MerchantVendorEntity>;
};

/** 商戶狀態 */
export enum MerchantStatus {
  /** 禁用 */
  Disabled = 'DISABLED',
  /** 啟用 */
  Enabled = 'ENABLED',
}

/** 商戶類型 */
export enum MerchantType {
  /** 加盟 */
  Franchise = 'Franchise',
  /** 平台自營 */
  Platform = 'Platform',
}

export type MerchantVendorEntity = {
  __typename?: 'MerchantVendorEntity';
  address: Address;
  contacts: Contact;
  /** 與用戶坐標之距離 */
  distance?: Maybe<Scalars['Float']['output']>;
  images?: Maybe<Array<Scalars['String']['output']>>;
  location: PostGisGeography;
  merchantUuid: Scalars['String']['output'];
  /** 门店名称 */
  name: Scalars['String']['output'];
  /** 是否為網路門店 */
  online: Scalars['Boolean']['output'];
  pricing: Array<VendorPricingEntity>;
  /** 門店提供之服務 */
  services: Array<MerchantVendorService>;
  /** 時區 */
  timezone: Scalars['String']['output'];
  uuid: Scalars['ID']['output'];
  zipCode: Scalars['String']['output'];
};

/** 門店提供之服務 */
export enum MerchantVendorService {
  /** 人工影印 */
  HumanServiceCopy = 'HumanServiceCopy',
  /** 人工列印 */
  HumanServicePrint = 'HumanServicePrint',
  /** 人工掃描 */
  HumanServiceScan = 'HumanServiceScan',
  /** 自助影印 */
  SelfServiceCopy = 'SelfServiceCopy',
  /** 自助列印 */
  SelfServicePrint = 'SelfServicePrint',
  /** 自助掃描 */
  SelfServiceScan = 'SelfServiceScan',
}

export type Mutation = {
  __typename?: 'Mutation';
  /** 人工訂單接受訂單 */
  acceptOrderManual: Order;
  /** 添加店休日期至門店 */
  addHolidayToVendor: VendorHoliday;
  /** 添加營業時間至門店 */
  addOpeningHourToVendor: VendorOpeningHour;
  /** 新增門店服務價格訊息 */
  addVendorServicePricing: VendorPricingEntity;
  /** 同意訂單退款之申請 */
  approveOrderRefundApplication: Order;
  /** 用戶綁定Line */
  bindLine: BindResDto;
  /** 綁定或變更Email */
  bindOrChangeEmail: BoolResDto;
  /** 綁定或變更手機號碼 */
  bindOrChangePhone: BoolResDto;
  /** 變更密碼 */
  changePassword: BoolResDto;
  /** 變更印表機紙匣紙張數量 */
  changePrinterTrayPaperAmount: Printer;
  /** 創建/更新裝置 */
  createDevice: DeviceUnion;
  createFacility: UuidResDto;
  createFacilityType: FacilityTypeEntity;
  createMerchant: MerchantEntity;
  createVendor: MerchantVendorEntity;
  /** 人工訂單拒絕訂單 */
  declineOrderManual: Order;
  deleteFacility: BoolResDto;
  deleteFacilityType: BoolResDto;
  deleteMerchant: BoolResDto;
  /** 獲取訂單操作歷史紀錄 */
  getOrderOperationHistories: Array<OrderOperationHistory>;
  login: LoginResDto;
  /** 訂單退款(管理員/商家手動發起) */
  refundOrder: Order;
  regenerateAccessSecret: FacilityEntity;
  /** 註冊(目前僅支持Email) */
  register: RegisterResDto;
  /** 拒絕訂單退款之申請 */
  rejectOrderRefundApplication: Order;
  sendEmailAuthCode: BoolResDto;
  sendPhoneAuthCode: BoolResDto;
  updateFacility: FacilityEntity;
  updateMerchant: MerchantEntity;
  updateUserProfile: UserProfile;
  /** 更新門店訊息 */
  updateVendor: MerchantVendorEntity;
  /** 更新門店服務價格訊息 */
  updateVendorServicePricing: VendorPricingEntity;
  /** 創建裝置型號 */
  upsertDeviceModel: DeviceModel;
  /** 創建設備的印表機 */
  upsertPrinterForFacility: Printer;
  /** 新增/更新印表機的紙匣 */
  upsertPrinterTrayForPrinter: Array<PrinterTray>;
};

export type MutationAcceptOrderManualArgs = {
  orderId: Scalars['String']['input'];
};

export type MutationAddHolidayToVendorArgs = {
  addVendorHolidayInput: AddVendorHolidayInput;
};

export type MutationAddOpeningHourToVendorArgs = {
  addVendorOpeningHourInput: AddVendorOpeningHourInput;
};

export type MutationAddVendorServicePricingArgs = {
  pricing: AddVendorPricingInput;
  vendorId: Scalars['String']['input'];
};

export type MutationApproveOrderRefundApplicationArgs = {
  applicationUuid: Scalars['String']['input'];
};

export type MutationBindLineArgs = {
  body: BindLineReqDto;
};

export type MutationBindOrChangeEmailArgs = {
  email: Scalars['String']['input'];
  verificationCode: Scalars['String']['input'];
};

export type MutationBindOrChangePhoneArgs = {
  phone: Scalars['String']['input'];
  verificationCode: Scalars['String']['input'];
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type MutationChangePrinterTrayPaperAmountArgs = {
  change: PrinterTrayPaperAmountChange;
};

export type MutationCreateDeviceArgs = {
  input: CreateDeviceInput;
};

export type MutationCreateFacilityArgs = {
  body: CreateFacilityReqDto;
};

export type MutationCreateFacilityTypeArgs = {
  createFacilityTypeInput: CreateFacilityTypeReqInput;
};

export type MutationCreateMerchantArgs = {
  createMerchantInput: CreateMerchantReqDto;
};

export type MutationCreateVendorArgs = {
  createVendorInput: CreateMerchantVendorReqDto;
};

export type MutationDeclineOrderManualArgs = {
  declineReason: Scalars['String']['input'];
  orderId: Scalars['String']['input'];
};

export type MutationDeleteFacilityArgs = {
  uuid: Scalars['String']['input'];
};

export type MutationDeleteFacilityTypeArgs = {
  facilityTypeUuid: Scalars['String']['input'];
};

export type MutationDeleteMerchantArgs = {
  uuid: Scalars['String']['input'];
};

export type MutationGetOrderOperationHistoriesArgs = {
  orderId: Scalars['String']['input'];
};

export type MutationLoginArgs = {
  body: LoginReqDto;
};

export type MutationRefundOrderArgs = {
  refundOrderInput: RefundOrderInput;
};

export type MutationRegenerateAccessSecretArgs = {
  uuid: Scalars['String']['input'];
};

export type MutationRegisterArgs = {
  body: RegisterReqDto;
};

export type MutationRejectOrderRefundApplicationArgs = {
  applicationUuid: Scalars['String']['input'];
  rejectedReason: Scalars['String']['input'];
};

export type MutationSendEmailAuthCodeArgs = {
  email: Scalars['String']['input'];
};

export type MutationSendPhoneAuthCodeArgs = {
  phone: Scalars['String']['input'];
};

export type MutationUpdateFacilityArgs = {
  body: UpdateFacilityReqDto;
  uuid: Scalars['String']['input'];
};

export type MutationUpdateMerchantArgs = {
  updateMerchantInput: UpdateMerchantInput;
  uuid: Scalars['String']['input'];
};

export type MutationUpdateUserProfileArgs = {
  profile: UserProfileInput;
};

export type MutationUpdateVendorArgs = {
  updateVendorInput: UpdateMerchantVendorInput;
  vendorId: Scalars['String']['input'];
};

export type MutationUpdateVendorServicePricingArgs = {
  pricing: UpdateVendorPricingInput;
  pricingId: Scalars['String']['input'];
};

export type MutationUpsertDeviceModelArgs = {
  body: UpsertDeviceModelInput;
};

export type MutationUpsertPrinterForFacilityArgs = {
  facilityId: Scalars['String']['input'];
  printer: UpsertPrinterInput;
};

export type MutationUpsertPrinterTrayForPrinterArgs = {
  printerId: Scalars['String']['input'];
  printerTrays: Array<UpsertPrinterTrayInput>;
};

/** 網路列印協議 */
export enum NetworkPrintingProtocal {
  /** http */
  Http = 'http',
  /** https */
  Https = 'https',
  /** ipp */
  Ipp = 'ipp',
  /** ipps */
  Ipps = 'ipps',
}

export type Order = {
  __typename?: 'Order';
  created_at: Scalars['DateTime']['output'];
  /** 訂單發貨/取件訊息 */
  delivery: OrderDelivery;
  /** Order Items */
  items: Array<OrderItem>;
  jobs: Array<JobEntity>;
  /** 用戶取件時訂單編號 */
  number: Scalars['String']['output'];
  /** 人工訂單訊息 */
  orderManual?: Maybe<OrderManual>;
  /** 用戶手動輸入取件時之密碼 */
  password: Scalars['String']['output'];
  /** 該訂單之所有支付單 */
  payments: Array<PaymentEntity>;
  /** 數量 */
  quantity: Scalars['Float']['output'];
  /** 訂單發票 */
  receipt?: Maybe<ReceiptEntity>;
  receiptBuyer: OrderReceiptBuyerEntity;
  /** 運費 */
  shippingFee?: Maybe<Scalars['Float']['output']>;
  /** 訂單狀態 */
  state: OrderStateEnum;
  /** 訂單小計(未稅) */
  subTotal: Scalars['Float']['output'];
  /** 訂單小計(含稅) */
  subTotalWithTax: Scalars['Float']['output'];
  /** 系統修正(增/減)金額 */
  systemModificationAmount: Scalars['Float']['output'];
  /** 訂單總金額 */
  total: Scalars['Float']['output'];
  /** 訂單總金額(含稅) */
  totalWithTax: Scalars['Float']['output'];
  /** 訂單類型 */
  type: OrderTypeEnum;
  /** 單價 */
  unitPrice: Scalars['Float']['output'];
  updated_at: Scalars['DateTime']['output'];
  /** 該訂單用戶 */
  user: UserEntity;
  user_uuid: Scalars['String']['output'];
  uuid: Scalars['ID']['output'];
  vendor: MerchantVendorEntity;
  /** 門店UUID */
  vendorUuid?: Maybe<Scalars['String']['output']>;
};

export type OrderCreated_AtFilterComparison = {
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type OrderDelivery = {
  __typename?: 'OrderDelivery';
  /** 店取門市訊息 */
  inStorePickUpVendor?: Maybe<MerchantVendorEntity>;
  /** 取件門市ID */
  inStorePickupVendorId?: Maybe<Scalars['String']['output']>;
  /** 發貨/取件方式 */
  method?: Maybe<OrderDeliveryMethodEnum>;
  /** 聯繫號碼 */
  phoneNumber: Scalars['String']['output'];
  /** 物流詳情 */
  shipping?: Maybe<Shipping>;
};

/** 訂單發貨/取件方式 */
export enum OrderDeliveryMethodEnum {
  /** 快遞 */
  Express = 'EXPRESS',
  /** 到店取件 */
  InStorePickup = 'IN_STORE_PICKUP',
  /** 自助機操作取件 */
  KioskSelfService = 'KIOSK_SELF_SERVICE',
}

export type OrderEdge = {
  __typename?: 'OrderEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the Order */
  node: Order;
};

export type OrderFilter = {
  and?: InputMaybe<Array<OrderFilter>>;
  created_at?: InputMaybe<OrderCreated_AtFilterComparison>;
  or?: InputMaybe<Array<OrderFilter>>;
  state?: InputMaybe<OrderStateFilterComparison>;
  type?: InputMaybe<OrderTypeFilterComparison>;
  updated_at?: InputMaybe<OrderUpdated_AtFilterComparison>;
  user_uuid?: InputMaybe<OrderUser_UuidFilterComparison>;
  vendorUuid?: InputMaybe<OrderVendorUuidFilterComparison>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  /** 名稱 */
  name: Scalars['String']['output'];
  /** 訂單訊息 */
  order: Order;
  /** 訂單ID */
  order_id: Scalars['String']['output'];
  /** Order Item ID */
  uuid: Scalars['String']['output'];
  /** 門店訊息 */
  vendor: Order;
  /** 門店ID */
  vendor_id: Scalars['String']['output'];
};

/** 人工訂單內文輸出訊息 */
export type OrderManaulBookBinding = {
  __typename?: 'OrderManaulBookBinding';
  /** 裝訂方式 */
  method: BookBindingMethodEnum;
  /** 人工訂單訊息 */
  orderManual: OrderManual;
};

/** 人工訂單訊息 */
export type OrderManual = {
  __typename?: 'OrderManual';
  /** 裝訂訊息 */
  bookBinding?: Maybe<OrderManaulBookBinding>;
  /** 內文 */
  contents: OrderManualContents;
  /** 預計訂單完成時間 */
  estimatedFinishTime?: Maybe<Scalars['DateTime']['output']>;
  /** 訂單完成時間 */
  finishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** 訂單訊息 */
  order: Order;
};

/** 人工訂單內文輸出訊息 */
export type OrderManualContents = {
  __typename?: 'OrderManualContents';
  configuration: PrintConfiguration;
  /** 文檔 */
  document: DocumentEntity;
  /** 文檔ID */
  documentId: Scalars['String']['output'];
  /** 訂單 */
  orderManual: OrderManual;
};

export type OrderManualCostEstimationContents = {
  __typename?: 'OrderManualCostEstimationContents';
  /** 數量 */
  quantity: Scalars['Float']['output'];
  /** 小計 */
  subTotal: Scalars['Float']['output'];
  /** 單價 */
  unitPrice: Scalars['Float']['output'];
};

export type OrderManualCostEstimationContentsInput = {
  /** 數量 */
  quantity: Scalars['Float']['input'];
  /** 小計 */
  subTotal: Scalars['Float']['input'];
  /** 單價 */
  unitPrice: Scalars['Float']['input'];
};

export type OrderManualCostEstimationDelivery = {
  __typename?: 'OrderManualCostEstimationDelivery';
  /** 小計 */
  subTotal: Scalars['Float']['output'];
};

export type OrderOperationHistory = {
  __typename?: 'OrderOperationHistory';
  /** 拒絕訂單原因(當operation為decline時必填) */
  declinedReason?: Maybe<Scalars['String']['output']>;
  /** 操作時間 */
  operatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** 操作 */
  operation: OrderOperationTypeEnum;
};

/** 訂單發貨/取件方式 */
export enum OrderOperationTypeEnum {
  /** 接收訂單(接單) */
  Accept = 'ACCEPT',
  /** 拒絕訂單 */
  Decline = 'DECLINE',
  /** 訂單製作完成 */
  MarkProduced = 'MARK_PRODUCED',
}

export type OrderReceiptBuyerEntity = {
  __typename?: 'OrderReceiptBuyerEntity';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** 根據發票買受人開立方式(Issue Method)對應之數據 */
  data: ReceiptBuyerDataUnion;
  /** 開立方式：電子紙本/載具 */
  issueMethod: IssueMethod;
  /** 開立至對象：個人(individual)/公司(company)/捐贈(donate) */
  issueTo: IssueTo;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user_uuid: Scalars['String']['output'];
  uuid: Scalars['ID']['output'];
};

export type OrderRefundApplicationReason = {
  __typename?: 'OrderRefundApplicationReason';
  /** 退款原因代碼 */
  code: Scalars['String']['output'];
  /** 描述 */
  description?: Maybe<Scalars['String']['output']>;
  /** 標題 */
  title: Scalars['String']['output'];
};

export type OrderRefundApplicationReasonInput = {
  /** 退款原因代碼 */
  code: Scalars['String']['input'];
  /** 描述 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** 標題 */
  title: Scalars['String']['input'];
};

export type OrderSort = {
  direction: SortDirection;
  field: OrderSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum OrderSortFields {
  CreatedAt = 'created_at',
  State = 'state',
  Type = 'type',
  UpdatedAt = 'updated_at',
  UserUuid = 'user_uuid',
  VendorUuid = 'vendorUuid',
}

/** 訂單狀態 */
export enum OrderStateEnum {
  /** 退款申請中 */
  ApplyingRefund = 'ApplyingRefund',
  /** 待支付 */
  ArrangingPayment = 'ArrangingPayment',
  /** 已取消 */
  Cancelled = 'Cancelled',
  /** 已關閉 */
  Closed = 'Closed',
  /** 已完成 */
  Completed = 'Completed',
  /** 商家已接單 */
  OrderTaken = 'OrderTaken',
  /** 已支付(未請款) */
  PaymentAuthorized = 'PaymentAuthorized',
  /** 已支付(已請款) */
  PaymentSettled = 'PaymentSettled',
  /** 待取件 */
  PickingUp = 'PickingUp',
  /** 製作中 */
  Producing = 'Producing',
  RefundApplicationRefused = 'RefundApplicationRefused',
  /** 已退款 */
  Refunded = 'Refunded',
  /** 退款中 */
  Refunding = 'Refunding',
  /** 拒絕接單 */
  RefuseTakingOrder = 'RefuseTakingOrder',
  /** 待接單 */
  TakingOrder = 'TakingOrder',
}

export type OrderStateFilterComparison = {
  eq?: InputMaybe<Scalars['String']['input']>;
};

/** 訂單種類 */
export enum OrderTypeEnum {
  /** 人工訂單 */
  Manual = 'MANUAL',
  /** 自助服務訂單 */
  SelfService = 'SELF_SERVICE',
}

export type OrderTypeFilterComparison = {
  eq?: InputMaybe<Scalars['String']['input']>;
};

export type OrderUpdated_AtFilterComparison = {
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type OrderUser_UuidFilterComparison = {
  eq?: InputMaybe<Scalars['String']['input']>;
};

export type OrderVendorUuidFilterComparison = {
  eq?: InputMaybe<Scalars['String']['input']>;
};

export enum Orientation_Enum {
  /** 橫式 */
  Landscape = 'LANDSCAPE',
  /** 直式 */
  Portrait = 'PORTRAIT',
}

export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor of the last returned record. */
  endCursor?: Maybe<Scalars['ConnectionCursor']['output']>;
  /** true if paging forward and there are more records. */
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  /** true if paging backwards and there are more records. */
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  /** The cursor of the first returned record. */
  startCursor?: Maybe<Scalars['ConnectionCursor']['output']>;
};

/** 紙張數量變更操作類型 */
export enum PaperSheetChangeAction {
  /** 減少 */
  Deplete = 'deplete',
  /** 添加 */
  Supplement = 'supplement',
}

export enum PaperType {
  /** 一般用紙 */
  Plain = 'Plain',
}

export type PaymentEntity = {
  __typename?: 'PaymentEntity';
  /** 金額 */
  amount: Scalars['Float']['output'];
  /** 取消支付時間 */
  canceledAt?: Maybe<Scalars['DateTime']['output']>;
  /** 支付超時關閉時間 */
  closedAt?: Maybe<Scalars['DateTime']['output']>;
  /** 支付方式 */
  method: PaymentMethodEnum;
  /** 支付時間 */
  paidAt?: Maybe<Scalars['DateTime']['output']>;
  paymentUrl: Scalars['String']['output'];
  /** 退款數據 */
  refunds: Array<Refund>;
  /** 支付單狀態 */
  state: PaymentState;
  uuid: Scalars['String']['output'];
};

/** 支付方式 */
export enum PaymentMethodEnum {
  /** Apple Pay */
  TappayApplePay = 'TAPPAY_APPLE_PAY',
  /** 悠遊付 */
  TappayEasyWallet = 'TAPPAY_EASY_WALLET',
  /** 街口支付 */
  TappayJkoPay = 'TAPPAY_JKO_PAY',
  /** Line Pay */
  TappayLinePay = 'TAPPAY_LINE_PAY',
}

/** 支付狀態 */
export enum PaymentState {
  /** 已支付(未請款) */
  Authorized = 'Authorized',
  /** 已創建 */
  Created = 'Created',
  /** 已拒絕 */
  Declined = 'Declined',
  /** 錯誤 */
  Error = 'Error',
  /** 已退款 */
  Refunded = 'Refunded',
  /** 已支付(已請款) */
  Settled = 'Settled',
  /** 支付超時關閉 */
  TimeoutClosed = 'Timeout_Closed',
}

export type PlatformAnnouncementEntity = {
  __typename?: 'PlatformAnnouncementEntity';
  canceled_at: Scalars['DateTime']['output'];
  content: Scalars['String']['output'];
  deleted: Scalars['Boolean']['output'];
  if_cancel: Scalars['Boolean']['output'];
  priority: Scalars['Float']['output'];
  publish_time: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  uuid: Scalars['ID']['output'];
};

export type PlatformAnnouncementUserEntity = {
  __typename?: 'PlatformAnnouncementUserEntity';
  announcement: PlatformAnnouncementEntity;
  announcement_uuid: Scalars['String']['output'];
  if_read: Scalars['Boolean']['output'];
  read_time: Scalars['DateTime']['output'];
  user_uuid: Scalars['String']['output'];
  uuid: Scalars['ID']['output'];
};

export type PostGisGeography = {
  __typename?: 'PostGisGeography';
  coordinates: Array<Scalars['Float']['output']>;
  type: Scalars['String']['output'];
};

export type PostGisGeographyInput = {
  coordinates: Array<Scalars['Float']['input']>;
  type: Scalars['String']['input'];
};

export type PrintBox = {
  __typename?: 'PrintBox';
  /** 裝置已連接的介面/接口(USB, Ethernet...等) */
  connectedInterfaces?: Maybe<Array<DeviceInterface>>;
  /** 所屬設備 */
  facility?: Maybe<FacilityEntity>;
  /** 設備ID */
  facilityId?: Maybe<Scalars['String']['output']>;
  /** 裝置ID (UUID) */
  id?: Maybe<Scalars['ID']['output']>;
  /** 裝置的介面/接口(USB, Ethernet...等) */
  interfaces?: Maybe<Array<DeviceInterface>>;
  /** 裝置型號 */
  model?: Maybe<DeviceModel>;
  /** 裝置名稱 */
  name?: Maybe<Scalars['String']['output']>;
  params?: Maybe<Array<Scalars['String']['output']>>;
  /** 装置序列号 */
  serialNumber?: Maybe<Scalars['String']['output']>;
  /** SNMP Host/IP(當該裝置支持透過SNMP監控時) */
  snmpMonitoringHost?: Maybe<Scalars['String']['output']>;
  /** SNMP Port(當該裝置支持透過SNMP監控時) */
  snmpMonitoringPort?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<DeviceStatus>;
  statusDetails?: Maybe<Scalars['String']['output']>;
  /** 设备类型 */
  type: DeviceType;
  type_deprecated?: Maybe<DeviceTypeEntity>;
};

export type PrintConfiguration = {
  __typename?: 'PrintConfiguration';
  /** 副本份數 */
  copies?: Maybe<Scalars['Int']['output']>;
  /** 紙張Size */
  media_size: MediaSize;
  /** 輸出方向 */
  orientation: Orientation_Enum;
  /** 輸出範圍； ex. "1-3" */
  pageRanges: Array<Scalars['String']['output']>;
  /** 單張多(n)頁；n可為1,2,4,6,9,16；目前僅支持1 */
  pagesPerSheet?: Maybe<Scalars['Int']['output']>;
  /** 輸出色彩模式 */
  print_color_mode: Print_Color_Mode_Enum;
  /** 單/雙面 */
  sides: Sides;
};

export type PrintConfigurationInput = {
  /** 副本份數 */
  copies?: InputMaybe<Scalars['Int']['input']>;
  /** 紙張Size */
  media_size: MediaSize;
  /** 輸出方向 */
  orientation: Orientation_Enum;
  /** 輸出範圍； ex. "1-3" */
  pageRanges: Array<Scalars['String']['input']>;
  /** 單張多(n)頁；n可為1,2,4,6,9,16；目前僅支持1 */
  pagesPerSheet?: InputMaybe<Scalars['Int']['input']>;
  /** 輸出色彩模式 */
  print_color_mode: Print_Color_Mode_Enum;
  /** 單/雙面 */
  sides: Sides;
};

export enum Print_Color_Mode_Enum {
  /** 彩色 */
  Color = 'COLOR',
  /** 黑白(灰階) */
  Monochrome = 'MONOCHROME',
}

export type Printer = {
  __typename?: 'Printer';
  /** 裝置已連接的介面/接口(USB, Ethernet...等) */
  connectedInterfaces?: Maybe<Array<DeviceInterface>>;
  /** 所屬設備 */
  facility?: Maybe<FacilityEntity>;
  /** 設備ID */
  facilityId?: Maybe<Scalars['String']['output']>;
  /** 裝置ID (UUID) */
  id?: Maybe<Scalars['ID']['output']>;
  /** 裝置的介面/接口(USB, Ethernet...等) */
  interfaces?: Maybe<Array<DeviceInterface>>;
  markers?: Maybe<Array<PrinterMarker>>;
  /** 裝置型號 */
  model?: Maybe<DeviceModel>;
  /** 裝置名稱 */
  name?: Maybe<Scalars['String']['output']>;
  /** 網路列印服務器IP */
  networkPrintingHost?: Maybe<Scalars['String']['output']>;
  /** 網路列印服務器端口號 */
  networkPrintingPort?: Maybe<Scalars['Float']['output']>;
  /** 網路列印協議 */
  networkPrintingProtocal?: Maybe<NetworkPrintingProtocal>;
  /** 網路列印資源路徑 */
  networkPrintingResourcePath?: Maybe<Scalars['Float']['output']>;
  params?: Maybe<Array<Scalars['String']['output']>>;
  /** 装置序列号 */
  serialNumber?: Maybe<Scalars['String']['output']>;
  /** SNMP Host/IP(當該裝置支持透過SNMP監控時) */
  snmpMonitoringHost?: Maybe<Scalars['String']['output']>;
  /** SNMP Port(當該裝置支持透過SNMP監控時) */
  snmpMonitoringPort?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<DeviceStatus>;
  statusDetails?: Maybe<Scalars['String']['output']>;
  /** 紙匣 */
  trays?: Maybe<Array<PrinterTray>>;
  /** 设备类型 */
  type: DeviceType;
  type_deprecated?: Maybe<DeviceTypeEntity>;
};

export type PrinterMarker = {
  __typename?: 'PrinterMarker';
  color?: Maybe<Scalars['String']['output']>;
  /** 耗材存量水位 */
  level?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  /** 耗材類型 */
  type?: Maybe<Scalars['String']['output']>;
};

export type PrinterTray = {
  __typename?: 'PrinterTray';
  /** 紙匣容量 */
  capacity?: Maybe<Scalars['Int']['output']>;
  /** 紙張大小 */
  mediaSize?: Maybe<MediaSize>;
  /** 紙匣編號 */
  number: Scalars['Int']['output'];
  /** 紙匣存量 */
  remainAmount?: Maybe<Scalars['Int']['output']>;
};

export type PrinterTrayPaperAmountChange = {
  /** 紙張數量變更操作類型 */
  action: PaperSheetChangeAction;
  /** 數量 */
  amount: Scalars['Float']['input'];
  /** 紙張大小 */
  mediaSize: MediaSize;
  /** 紙張類型 */
  paperType: PaperType;
  /** Printer ID */
  printerId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getDeviceList: Array<GetDeviceListByFacilityUuidResDto>;
  getFacilityList: GetFacilityListResDto;
  getFacilityTypeList: Array<FacilityTypeEntity>;
  getInfo: GetFacilityInfoResDto;
  /** 查詢指定日期當週的營業時間 */
  getOpeningHoursForWeek: Array<VendorOpeningHour>;
  /** 目前平台支持的裝置類型 */
  getSupportedDeviceTypes: Array<DeviceTypeEntity>;
  /** 用戶數據 */
  me: UserEntity;
  /** 獲取所有商戶列表 */
  merchants: Array<MerchantEntity>;
  myProfile: UserProfile;
  /** 獲取訂單 */
  orders: Array<Order>;
  userPreference: UserPreferenceEntity;
  vendor: MerchantVendorEntity;
};

export type QueryGetDeviceListArgs = {
  facilityUuid: Scalars['String']['input'];
};

export type QueryGetFacilityListArgs = {
  end_time?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  page_index?: InputMaybe<Scalars['Int']['input']>;
  page_size?: InputMaybe<Scalars['Int']['input']>;
  start_time?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryGetInfoArgs = {
  uuid: Scalars['String']['input'];
};

export type QueryGetOpeningHoursForWeekArgs = {
  vendorId: Scalars['String']['input'];
};

export type QueryOrdersArgs = {
  filter?: OrderFilter;
  paging?: CursorPaging;
  sorting?: Array<OrderSort>;
};

export type QueryUserPreferenceArgs = {
  id: Scalars['String']['input'];
};

export type QueryVendorArgs = {
  uuid: Scalars['String']['input'];
};

export type ReceiptAllowanceEntity = {
  __typename?: 'ReceiptAllowanceEntity';
  /** 開立折讓原因 */
  reasons?: Maybe<Scalars['String']['output']>;
  receipt: ReceiptEntity;
};

export type ReceiptBuyer = {
  __typename?: 'ReceiptBuyer';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** 根據發票買受人開立方式(Issue Method)對應之數據 */
  data: ReceiptBuyerDataUnion;
  /** 開立方式：電子紙本/載具 */
  issueMethod: IssueMethod;
  /** 開立至對象：個人(individual)/公司(company)/捐贈(donate) */
  issueTo: IssueTo;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user_uuid: Scalars['String']['output'];
  uuid: Scalars['ID']['output'];
};

export type ReceiptBuyerDataUnion = CarrierData | CustomerData | DonationData;

export type ReceiptEntity = {
  __typename?: 'ReceiptEntity';
  /** 折讓單 */
  allowances?: Maybe<Array<ReceiptAllowanceEntity>>;
  /** 開立時間 */
  issueAt?: Maybe<Scalars['DateTime']['output']>;
  /** 作廢時間 */
  issueInvalidAt?: Maybe<Scalars['DateTime']['output']>;
  /** 通知用戶作廢時間 */
  issueInvalidNotifiedAt?: Maybe<Scalars['DateTime']['output']>;
  /** 作廢原因 */
  issueInvalidReason?: Maybe<Scalars['String']['output']>;
  /** 通知用戶開立時間 */
  issueNotifiedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Order UUID */
  order_uuid: Scalars['String']['output'];
  /** Payment UUID */
  payment_uuid: Scalars['String']['output'];
  /** 發票開立品項明細 */
  receiptItems: Array<ReceiptItem>;
  /** 買受人資訊(電子發票開立資訊) */
  receipt_buyer: ReceiptBuyer;
  /** 發票號碼 */
  receipt_number?: Maybe<Scalars['String']['output']>;
  /** 發票隨機碼 */
  receipt_random_number?: Maybe<Scalars['String']['output']>;
  /** 發票開立狀態 */
  status: ReceiptStateEnum;
  /** 發票總金額 */
  total_amount: Scalars['Float']['output'];
  /** Unique Identifier */
  uuid: Scalars['String']['output'];
};

export type ReceiptItem = {
  __typename?: 'ReceiptItem';
  /** 總價 */
  amount: Scalars['Float']['output'];
  /** 總價(含稅) */
  amountWithTax: Scalars['Float']['output'];
  /** 品項名稱 */
  name: Scalars['String']['output'];
  /** 數量 */
  quantity: Scalars['Float']['output'];
  /** 計算單位(ex. 張/次) */
  unit: Scalars['String']['output'];
  /** 單價 */
  unitPrice: Scalars['Float']['output'];
};

/** 發票狀態 */
export enum ReceiptStateEnum {
  /** 已開立折讓 */
  Allowance = 'ALLOWANCE',
  /** 已作廢折讓 */
  AllowanceInvalided = 'ALLOWANCE_INVALIDED',
  /** 已開立 */
  Issued = 'ISSUED',
  /** 已作廢 */
  IssueInvalided = 'ISSUE_INVALIDED',
  /** 待開立 */
  PendingIssue = 'PENDING_ISSUE',
}

export type Refund = {
  __typename?: 'Refund';
  /** 退款失敗/錯誤訊息 */
  errorMessage: Scalars['String']['output'];
  /** 支付單數據 */
  payment: PaymentEntity;
  /** 支付單ID */
  paymentId: Scalars['String']['output'];
  /** 退款原因 */
  reason?: Maybe<Scalars['String']['output']>;
  /** 退款時間(API請求失敗時間) */
  refundFailedAt?: Maybe<Scalars['DateTime']['output']>;
  /** 退款時間(API請求成功時間) */
  refundedAt?: Maybe<Scalars['DateTime']['output']>;
  /** 退款狀態 */
  state: RefundState;
  /** 退款總額 */
  total: Scalars['Float']['output'];
  /** 退款交易流水號 */
  transactionId: Scalars['String']['output'];
  /** ID */
  uuid: Scalars['String']['output'];
};

export type RefundOrderInput = {
  /** 訂單ID(UUID) */
  orderId: Scalars['String']['input'];
  /** 退款原因 */
  reason?: InputMaybe<Scalars['String']['input']>;
};

/** 退款狀態 */
export enum RefundState {
  /** 退款中(銀行退款作業中) */
  Authorized = 'Authorized',
  /** 退款失敗 */
  Failed = 'Failed',
  /** 待退款 */
  Pending = 'Pending',
  /** 退款中(平台/商家處理中) */
  Processing = 'Processing',
  /** 已退款 */
  Settled = 'Settled',
}

export type RegisterReqDto = {
  /** 驗證碼 */
  code: Scalars['String']['input'];
  /** 密碼 */
  credential: Scalars['String']['input'];
  /** 身份類型之識別碼(email/phone) */
  identifier: Scalars['String']['input'];
  /** 註冊身份類型(email/phone)，目前只支持email */
  identity_type: UserIdentityType;
  profile?: InputMaybe<RegisterReqDtoProfile>;
};

export type RegisterReqDtoProfile = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  /** 生日(UTC Timstamp) */
  birthday?: InputMaybe<Scalars['Int']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<UserGender>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
};

export type RegisterResDto = {
  __typename?: 'RegisterResDto';
  expires_in: Scalars['Int']['output'];
  token: Scalars['String']['output'];
};

export type SerialInterface = {
  __typename?: 'SerialInterface';
  /** 串行接口的波特率 */
  baudRate?: Maybe<Scalars['Int']['output']>;
  /** 串行接口的数据位数 */
  dataBits?: Maybe<Scalars['Int']['output']>;
};

export type Shipping = {
  __typename?: 'Shipping';
  /** 物流公司 */
  courier: Scalars['String']['output'];
  /** Order Delivery */
  orderDelivery: OrderDelivery;
  /** Order Delivery ID */
  orderDeliveryId: Scalars['String']['output'];
  /** Shipping Recipient Info */
  recipientInfo: ShippingRecipientInfo;
  /** 物流狀態 */
  status: Courier;
  /** 物流單號 */
  trackingNumber?: Maybe<Scalars['String']['output']>;
};

export type ShippingRecipientInfo = {
  __typename?: 'ShippingRecipientInfo';
  /** 城市 */
  city: Scalars['String']['output'];
  /** 詳細地址 */
  details?: Maybe<Scalars['String']['output']>;
  /** 區域 */
  district: Scalars['String']['output'];
  /** 省份 */
  province?: Maybe<Scalars['String']['output']>;
  /** 收件人姓名 */
  recipientName: Scalars['String']['output'];
  /** 收件人电话 */
  recipientPhone: Scalars['String']['output'];
  /** 路名 */
  street: Scalars['String']['output'];
};

export enum Sides {
  /** 單面 */
  OneSided = 'ONE_SIDED',
  /** 雙面(長邊裝訂) */
  TwoSidedLongEdge = 'TWO_SIDED_LONG_EDGE',
  /** 雙面(短邊裝訂) */
  TwoSidedShortEdge = 'TWO_SIDED_SHORT_EDGE',
}

/** Sort Directions */
export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

/** Sort Nulls Options */
export enum SortNulls {
  NullsFirst = 'NULLS_FIRST',
  NullsLast = 'NULLS_LAST',
}

export type UsbInterface = {
  __typename?: 'USBInterface';
  /** USB 接口的设备路径 */
  devicePath?: Maybe<Scalars['String']['output']>;
  /** USB 接口的产品标识符 */
  productId?: Maybe<Scalars['String']['output']>;
  /** USB 接口的速度 */
  speed?: Maybe<Scalars['String']['output']>;
  /** USB 接口的供应商标识符 */
  vendorId?: Maybe<Scalars['String']['output']>;
  /** USB 接口的版本号 */
  version?: Maybe<Scalars['String']['output']>;
};

export type UpdateFacilityReqDto = {
  administrator_uuid: Scalars['String']['input'];
  name: Scalars['String']['input'];
  type_uuid: Scalars['String']['input'];
  vendor_uuid: Scalars['String']['input'];
};

export type UpdateMerchantInput = {
  /** 地址 */
  address?: InputMaybe<AddressInput>;
  /** 银行账号 */
  bankAccount?: InputMaybe<Scalars['String']['input']>;
  /** 银行名称 */
  bankName?: InputMaybe<Scalars['String']['input']>;
  /** 商户名称 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 商户状态 */
  status?: InputMaybe<MerchantStatus>;
  /** 公司统一编号 */
  taxIdentifier?: InputMaybe<Scalars['String']['input']>;
  /** 商户类型 */
  type?: InputMaybe<MerchantType>;
};

export type UpdateMerchantVendorInput = {
  address?: InputMaybe<AddressInput>;
  location?: InputMaybe<PostGisGeographyInput>;
  merchantUuid?: InputMaybe<Scalars['String']['input']>;
  /** 门店名称 */
  name?: InputMaybe<Scalars['String']['input']>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateVendorPricingInput = {
  media?: InputMaybe<MediaSize>;
  /** 列印(輸出)色彩模式；彩色(COLOR)/黑白(MONOCHROME) */
  print_color_mode?: InputMaybe<Print_Color_Mode_Enum>;
  /** 門店的價格的服務 */
  service?: InputMaybe<MerchantVendorService>;
  /** 該服務之單價 */
  unit_price?: InputMaybe<Scalars['Float']['input']>;
};

export type UpsertDeviceModelInput = {
  /** 裝置ID (UUID) */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** 裝置製造商 */
  manufacture: Scalars['String']['input'];
  model: Scalars['String']['input'];
};

export type UpsertPrintBoxInput = {
  /** 設備ID */
  facilityId?: InputMaybe<Scalars['String']['input']>;
  /** 裝置ID (UUID) */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** 裝置型號 */
  model?: InputMaybe<UpsertDeviceModelInput>;
  /** 裝置名稱 */
  name?: InputMaybe<Scalars['String']['input']>;
  params?: InputMaybe<Array<Scalars['String']['input']>>;
  /** 装置序列号 */
  serialNumber?: InputMaybe<Scalars['String']['input']>;
  /** SNMP Host/IP(當該裝置支持透過SNMP監控時) */
  snmpMonitoringHost?: InputMaybe<Scalars['String']['input']>;
  /** SNMP Port(當該裝置支持透過SNMP監控時) */
  snmpMonitoringPort?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<DeviceStatus>;
  statusDetails?: InputMaybe<Scalars['String']['input']>;
  /** 设备类型 */
  type: DeviceType;
};

export type UpsertPrinterInput = {
  /** 設備ID */
  facilityId?: InputMaybe<Scalars['String']['input']>;
  /** 裝置ID (UUID) */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** 耗材；碳粉/墨水/色帶 */
  markers?: InputMaybe<UpsertPrinterMarkerInput>;
  /** 裝置型號 */
  model?: InputMaybe<UpsertDeviceModelInput>;
  /** 裝置名稱 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 網路列印服務器IP */
  networkPrintingHost?: InputMaybe<Scalars['String']['input']>;
  /** 網路列印服務器端口號 */
  networkPrintingPort?: InputMaybe<Scalars['Float']['input']>;
  /** 網路列印協議 */
  networkPrintingProtocal?: InputMaybe<NetworkPrintingProtocal>;
  /** 網路列印資源路徑 */
  networkPrintingResourcePath?: InputMaybe<Scalars['Float']['input']>;
  params?: InputMaybe<Array<Scalars['String']['input']>>;
  /** 装置序列号 */
  serialNumber?: InputMaybe<Scalars['String']['input']>;
  /** SNMP Host/IP(當該裝置支持透過SNMP監控時) */
  snmpMonitoringHost?: InputMaybe<Scalars['String']['input']>;
  /** SNMP Port(當該裝置支持透過SNMP監控時) */
  snmpMonitoringPort?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<DeviceStatus>;
  statusDetails?: InputMaybe<Scalars['String']['input']>;
  /** 紙匣 */
  trays?: InputMaybe<Array<UpsertPrinterTrayInput>>;
  /** 设备类型 */
  type: DeviceType;
};

export type UpsertPrinterMarkerInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  /** 耗材存量水位 */
  level?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  /** 耗材類型 */
  type?: InputMaybe<Scalars['String']['input']>;
};

export type UpsertPrinterTrayInput = {
  /** 紙匣容量 */
  capacity?: InputMaybe<Scalars['Int']['input']>;
  /** 紙張大小 */
  mediaSize?: InputMaybe<MediaSize>;
  /** 紙匣編號 */
  number: Scalars['Int']['input'];
  /** 紙匣存量 */
  remainAmount?: InputMaybe<Scalars['Int']['input']>;
};

export type UpsertRouterInput = {
  /** 4G接入點名稱 */
  apn?: InputMaybe<Scalars['String']['input']>;
  /** 設備ID */
  facilityId?: InputMaybe<Scalars['String']['input']>;
  /** 裝置ID (UUID) */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** 4G供應商 */
  mobileServiceProvider?: InputMaybe<Scalars['String']['input']>;
  /** 裝置型號 */
  model?: InputMaybe<UpsertDeviceModelInput>;
  /** 裝置名稱 */
  name?: InputMaybe<Scalars['String']['input']>;
  params?: InputMaybe<Array<Scalars['String']['input']>>;
  /** 路由器密码 */
  password?: InputMaybe<Scalars['String']['input']>;
  /** 装置序列号 */
  serialNumber?: InputMaybe<Scalars['String']['input']>;
  /** 4G卡號 */
  simCardNumber?: InputMaybe<Scalars['String']['input']>;
  /** SNMP Host/IP(當該裝置支持透過SNMP監控時) */
  snmpMonitoringHost?: InputMaybe<Scalars['String']['input']>;
  /** SNMP Port(當該裝置支持透過SNMP監控時) */
  snmpMonitoringPort?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<DeviceStatus>;
  statusDetails?: InputMaybe<Scalars['String']['input']>;
  /** 设备类型 */
  type: DeviceType;
  /** 路由器用户名 */
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UserAuthLocal = {
  __typename?: 'UserAuthLocal';
  /** Email */
  email?: Maybe<Scalars['String']['output']>;
  /** 用户手機號 */
  phone?: Maybe<Scalars['String']['output']>;
  /** 所属用户uuid */
  userUuid: Scalars['ID']['output'];
  /** username */
  username?: Maybe<Scalars['String']['output']>;
};

export type UserAuthThirdParty = {
  __typename?: 'UserAuthThirdParty';
  /** 第三方登陸身份標示 */
  identifier: Scalars['String']['output'];
  /** 第三方登陸之平台 */
  identityType: UserIdentityType;
  userUuid: Scalars['String']['output'];
  uuid: Scalars['ID']['output'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  /** 地址簿 */
  addressBook: Array<Maybe<AddressBook>>;
  /** 登入訊息 */
  authLocal: UserAuthLocal;
  /** 第三方登入訊息 */
  authThirdParty: Array<UserAuthThirdParty>;
  platformAnnouncementUserList?: Maybe<Array<PlatformAnnouncementUserEntity>>;
  preference: UserPreferenceEntity;
  profile: UserProfile;
  userRole: UserRoleEntity;
  uuid: Scalars['ID']['output'];
};

export enum UserGender {
  Female = 'female',
  Male = 'male',
}

export enum UserIdentityType {
  /** Email */
  Email = 'email',
  /** Line */
  Line = 'line',
  /** 行動電話號碼 */
  Phone = 'phone',
}

export type UserPreferenceEntity = {
  __typename?: 'UserPreferenceEntity';
  language: UserPreferenceLanguage;
  userUuid: Scalars['ID']['output'];
};

export enum UserPreferenceLanguage {
  ZhCn = 'ZH_CN',
  ZhHk = 'ZH_HK',
  ZhTw = 'ZH_TW',
}

export type UserProfile = {
  __typename?: 'UserProfile';
  /** 用戶頭像 */
  avatar?: Maybe<Scalars['String']['output']>;
  /** 生日(UTC Timstamp) */
  birthday?: Maybe<Scalars['Float']['output']>;
  /** 名字 */
  firstName?: Maybe<Scalars['String']['output']>;
  /** 性別 */
  gender?: Maybe<UserGender>;
  /** 姓氏 */
  lastName?: Maybe<Scalars['String']['output']>;
  /** 用戶暱稱 */
  nickname?: Maybe<Scalars['String']['output']>;
  /** 用戶UUID */
  userUuid: Scalars['ID']['output'];
};

export type UserProfileInput = {
  /** 用戶頭像 */
  avatar?: InputMaybe<Scalars['String']['input']>;
  /** 生日(UTC Timstamp) */
  birthday?: InputMaybe<Scalars['Float']['input']>;
  /** 名字 */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** 性別 */
  gender?: InputMaybe<UserGender>;
  /** 姓氏 */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** 用戶暱稱 */
  nickname?: InputMaybe<Scalars['String']['input']>;
};

export type UserRoleEntity = {
  __typename?: 'UserRoleEntity';
  roleUuidList: Array<Scalars['String']['output']>;
  userUuid: Scalars['ID']['output'];
};

export type UuidResDto = {
  __typename?: 'UuidResDto';
  uuid: Scalars['String']['output'];
};

/** 門店的店休時間數據。date是該門店時區的時間。 */
export type VendorHoliday = {
  __typename?: 'VendorHoliday';
  createdAt: Scalars['DateTime']['output'];
  /** 該門店所在時區的日期 */
  date: Scalars['String']['output'];
  /** 該店休日期備註 */
  note: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  /** 該店休日期所屬的門店 */
  vendor: MerchantVendorEntity;
  /** 門店ID */
  vendorId: Scalars['String']['output'];
};

export type VendorOpeningHour = {
  __typename?: 'VendorOpeningHour';
  createdAt: Scalars['DateTime']['output'];
  /** Day of Week(0~6). 0是禮拜天, 6是禮拜六 */
  dayOfWeek: Scalars['Int']['output'];
  /** 該營業時段結束時間(門店本地時區時間) */
  endTime: Scalars['String']['output'];
  /** 該營業時段備註 */
  note: Scalars['String']['output'];
  /** 該營業時段開始時間(門店本地時區時間) */
  startTime: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  /** 該營業時段所屬的門店 */
  vendor: MerchantVendorEntity;
};

export type VendorPricingEntity = {
  __typename?: 'VendorPricingEntity';
  created_at: Scalars['DateTime']['output'];
  media: MediaSize;
  /** 列印(輸出)色彩模式；彩色(COLOR)/黑白(MONOCHROME) */
  print_color_mode: Print_Color_Mode_Enum;
  /** 門店的價格的服務 */
  service: MerchantVendorService;
  /** 該服務之單價 */
  unit_price: Scalars['Float']['output'];
  updated_at: Scalars['DateTime']['output'];
  uuid: Scalars['ID']['output'];
};

export type VendorPricingInput = {
  created_at: Scalars['DateTime']['input'];
  media: MediaSize;
  /** 列印(輸出)色彩模式；彩色(COLOR)/黑白(MONOCHROME) */
  print_color_mode: Print_Color_Mode_Enum;
  /** 門店的價格的服務 */
  service: MerchantVendorService;
  /** 該服務之單價 */
  unit_price: Scalars['Float']['input'];
  updated_at: Scalars['DateTime']['input'];
  uuid: Scalars['ID']['input'];
};

export type WiFiInterface = {
  __typename?: 'WiFiInterface';
  /** WiFi 接口的密码 */
  password?: Maybe<Scalars['String']['output']>;
  /** WiFi 接口的 SSID */
  ssid?: Maybe<Scalars['String']['output']>;
};

export type MerchantsQueryVariables = Exact<{ [key: string]: never }>;

export type MerchantsQuery = {
  __typename?: 'Query';
  merchants: Array<{
    __typename?: 'MerchantEntity';
    uuid: string;
    name: string;
    type: MerchantType;
    taxIdentifier: string;
    bankName?: string | null;
    bankAccount?: string | null;
    status: MerchantStatus;
    address?: {
      __typename?: 'Address';
      city: string;
      dist: string;
      address: string;
    } | null;
  }>;
};

export type LoginMutationVariables = Exact<{
  loginReq: LoginReqDto;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: { __typename?: 'LoginResDto'; token: string; expires_in: number };
};

export type DeleteMerchantMutationVariables = Exact<{
  uuid: Scalars['String']['input'];
}>;

export type DeleteMerchantMutation = {
  __typename?: 'Mutation';
  deleteMerchant: { __typename?: 'BoolResDto'; result: boolean };
};

export type UpdateMerchantMutationVariables = Exact<{
  updateMerchantInput: UpdateMerchantInput;
  uuid: Scalars['String']['input'];
}>;

export type UpdateMerchantMutation = {
  __typename?: 'Mutation';
  updateMerchant: {
    __typename?: 'MerchantEntity';
    uuid: string;
    name: string;
    type: MerchantType;
  };
};

export type CreateMerchantMutationVariables = Exact<{
  createMerchantInput: CreateMerchantReqDto;
}>;

export type CreateMerchantMutation = {
  __typename?: 'Mutation';
  createMerchant: {
    __typename?: 'MerchantEntity';
    uuid: string;
    name: string;
    type: MerchantType;
  };
};

export const MerchantsDocument = gql`
  query Merchants {
    merchants {
      uuid
      name
      type
      taxIdentifier
      bankName
      bankAccount
      status
      address {
        city
        dist
        address
      }
    }
  }
`;

/**
 * __useMerchantsQuery__
 *
 * To run a query within a React component, call `useMerchantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMerchantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMerchantsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMerchantsQuery(
  baseOptions?: Apollo.QueryHookOptions<MerchantsQuery, MerchantsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MerchantsQuery, MerchantsQueryVariables>(
    MerchantsDocument,
    options
  );
}
export function useMerchantsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MerchantsQuery,
    MerchantsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MerchantsQuery, MerchantsQueryVariables>(
    MerchantsDocument,
    options
  );
}
export type MerchantsQueryHookResult = ReturnType<typeof useMerchantsQuery>;
export type MerchantsLazyQueryHookResult = ReturnType<
  typeof useMerchantsLazyQuery
>;
export type MerchantsQueryResult = Apollo.QueryResult<
  MerchantsQuery,
  MerchantsQueryVariables
>;
export const LoginDocument = gql`
  mutation Login($loginReq: LoginReqDto!) {
    login(body: $loginReq) {
      token
      expires_in
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginReq: // value for 'loginReq'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const DeleteMerchantDocument = gql`
  mutation DeleteMerchant($uuid: String!) {
    deleteMerchant(uuid: $uuid) {
      result
    }
  }
`;
export type DeleteMerchantMutationFn = Apollo.MutationFunction<
  DeleteMerchantMutation,
  DeleteMerchantMutationVariables
>;

/**
 * __useDeleteMerchantMutation__
 *
 * To run a mutation, you first call `useDeleteMerchantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMerchantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMerchantMutation, { data, loading, error }] = useDeleteMerchantMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useDeleteMerchantMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteMerchantMutation,
    DeleteMerchantMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteMerchantMutation,
    DeleteMerchantMutationVariables
  >(DeleteMerchantDocument, options);
}
export type DeleteMerchantMutationHookResult = ReturnType<
  typeof useDeleteMerchantMutation
>;
export type DeleteMerchantMutationResult =
  Apollo.MutationResult<DeleteMerchantMutation>;
export type DeleteMerchantMutationOptions = Apollo.BaseMutationOptions<
  DeleteMerchantMutation,
  DeleteMerchantMutationVariables
>;
export const UpdateMerchantDocument = gql`
  mutation UpdateMerchant(
    $updateMerchantInput: UpdateMerchantInput!
    $uuid: String!
  ) {
    updateMerchant(updateMerchantInput: $updateMerchantInput, uuid: $uuid) {
      uuid
      name
      type
    }
  }
`;
export type UpdateMerchantMutationFn = Apollo.MutationFunction<
  UpdateMerchantMutation,
  UpdateMerchantMutationVariables
>;

/**
 * __useUpdateMerchantMutation__
 *
 * To run a mutation, you first call `useUpdateMerchantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMerchantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMerchantMutation, { data, loading, error }] = useUpdateMerchantMutation({
 *   variables: {
 *      updateMerchantInput: // value for 'updateMerchantInput'
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useUpdateMerchantMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateMerchantMutation,
    UpdateMerchantMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateMerchantMutation,
    UpdateMerchantMutationVariables
  >(UpdateMerchantDocument, options);
}
export type UpdateMerchantMutationHookResult = ReturnType<
  typeof useUpdateMerchantMutation
>;
export type UpdateMerchantMutationResult =
  Apollo.MutationResult<UpdateMerchantMutation>;
export type UpdateMerchantMutationOptions = Apollo.BaseMutationOptions<
  UpdateMerchantMutation,
  UpdateMerchantMutationVariables
>;
export const CreateMerchantDocument = gql`
  mutation CreateMerchant($createMerchantInput: CreateMerchantReqDto!) {
    createMerchant(createMerchantInput: $createMerchantInput) {
      uuid
      name
      type
    }
  }
`;
export type CreateMerchantMutationFn = Apollo.MutationFunction<
  CreateMerchantMutation,
  CreateMerchantMutationVariables
>;

/**
 * __useCreateMerchantMutation__
 *
 * To run a mutation, you first call `useCreateMerchantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMerchantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMerchantMutation, { data, loading, error }] = useCreateMerchantMutation({
 *   variables: {
 *      createMerchantInput: // value for 'createMerchantInput'
 *   },
 * });
 */
export function useCreateMerchantMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateMerchantMutation,
    CreateMerchantMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateMerchantMutation,
    CreateMerchantMutationVariables
  >(CreateMerchantDocument, options);
}
export type CreateMerchantMutationHookResult = ReturnType<
  typeof useCreateMerchantMutation
>;
export type CreateMerchantMutationResult =
  Apollo.MutationResult<CreateMerchantMutation>;
export type CreateMerchantMutationOptions = Apollo.BaseMutationOptions<
  CreateMerchantMutation,
  CreateMerchantMutationVariables
>;
