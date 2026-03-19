import { cleanEnvArgs, parseBooleanEnv, parseArrayEnv } from './clean-env-args';
import { currentVersion } from './version';
import envPaths from 'env-paths';

export const ENV_PATHS = envPaths('lark-mcp');

const [major] = process.versions.node.split('.').map(Number);

export const USER_AGENT = `oapi-sdk-mcp/${currentVersion}`;
export const NODE_VERSION_MAJOR = major;

export const OAPI_MCP_DEFAULT_ARGS = {
  domain: 'https://open.feishu.cn',
  toolNameCase: 'snake',
  language: 'en',
  tokenMode: 'auto',
  mode: 'stdio',
  host: 'localhost',
  port: '3000',
};

export const OAPI_MCP_ENV_ARGS = {
  ...cleanEnvArgs({
    appId: process.env.APP_ID,
    appSecret: process.env.APP_SECRET,
    userAccessToken: process.env.USER_ACCESS_TOKEN,
    tokenMode: process.env.LARK_TOKEN_MODE,
    tools: process.env.LARK_TOOLS,
    domain: process.env.LARK_DOMAIN,
    language: process.env.LARK_LANGUAGE,
    toolNameCase: process.env.LARK_TOOL_NAME_CASE,
    mode: process.env.LARK_MODE,
    host: process.env.LARK_HOST,
    port: process.env.LARK_PORT,
  }),
  oauth: parseBooleanEnv(process.env.LARK_OAUTH),
  scope: parseArrayEnv(process.env.LARK_SCOPE),
};

export enum OAPI_MCP_ERROR_CODE {
  USER_ACCESS_TOKEN_INVALID = 99991668,
  USER_ACCESS_TOKEN_UNAUTHORIZED = 99991679,
}
