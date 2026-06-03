import { api } from "../lib/axios";
import { PDF_ROUTES } from "../constants/pdfRoutes";
import { UploadPdfResponse } from "../types/pdf";

export const uploadPdf = async (file: File): Promise<UploadPdfResponse> => {
  const formData = new FormData();
  formData.append("pdf", file); 

  const response = await api.post<UploadPdfResponse>(PDF_ROUTES.UPLOAD, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const extractPdf = async (fileName: string,  selectedPages: number[]): Promise<Blob> => {
  const response = await api.post<Blob>(PDF_ROUTES.EXTRACT, { fileName, selectedPages }, { responseType: "blob" });
  return response.data;
};

