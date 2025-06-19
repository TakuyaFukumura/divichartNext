export function exportChartImage(chartRef: React.RefObject<any>, filePrefix: string) {
    if (chartRef.current) {
        const url = chartRef.current.toBase64Image();
        const link = document.createElement("a");
        link.href = url;
        const now = new Date();
        const timestamp = now.toISOString().replace(/[:-]/g, "").replace(/\..+/, "");
        link.download = `${filePrefix}_${timestamp}.png`;
        link.click();
    }
}
