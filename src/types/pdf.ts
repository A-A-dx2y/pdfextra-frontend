export interface UploadPdfResponse {
  success: boolean;
  message: string;
  data: {
    fileName: string;
  };
}


export interface PDFPageData {
  id: number;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}
