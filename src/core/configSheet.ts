// 配置单导入导出：仅含种子与参数，别人据此可 1:1 复现
import type { GenParams } from '../types';

export interface ConfigSheet {
  schema: 'fan-editor-config/v1';
  exportedAt: string;
  params: GenParams;
  /** 预期复现指纹（段数 + 精度），用于导入后自检 */
  expected: { precision: 'full' | 'preview'; segmentCount: number };
}

export function exportConfigSheet(params: GenParams, expected: ConfigSheet['expected']): string {
  const sheet: ConfigSheet = {
    schema: 'fan-editor-config/v1',
    exportedAt: new Date().toISOString(),
    params: { ...params },
    expected
  };
  return JSON.stringify(sheet, null, 2);
}

export function parseConfigSheet(text: string): ConfigSheet {
  const data = JSON.parse(text);
  if (data?.schema !== 'fan-editor-config/v1') {
    throw new Error('配置单格式不识别：缺少 schema 标记');
  }
  const p = data.params;
  const required = ['apexX', 'apexY', 'radius', 'slope', 'mainWidth', 'branchLevels', 'seed'];
  for (const k of required) {
    if (typeof p?.[k] !== 'number') throw new Error(`配置单缺少参数：${k}`);
  }
  return data as ConfigSheet;
}

export function downloadText(filename: string, text: string, mime = 'application/json') {
  const blob = new Blob([text], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
