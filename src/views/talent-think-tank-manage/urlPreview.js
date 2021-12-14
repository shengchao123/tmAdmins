import { officePreviewHost, fileHost } from '@/request/urls.js'

export function previewType (url) {
  const pdfType = ['pdf']
  const officeType = ['xls', 'xlsx', 'doc', 'docx']
  const fileType = url.substring(url.lastIndexOf('.') + 1, url.length)
  if (pdfType.includes(fileType)) { // pdf格式
    window.open(fileHost + url)
  } else if (officeType.includes(fileType)) { // 文件格式
    window.open(officePreviewHost + url)
  }
}
export function onShowPreview (url) {
  previewType(url)
}
