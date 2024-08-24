export function isFileList(value: unknown): value is FileList {
  return value instanceof FileList;
}
