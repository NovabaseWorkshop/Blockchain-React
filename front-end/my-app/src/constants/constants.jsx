import localIpUrl from "local-ip-url/prepareUrls";

export const FARMER = localIpUrl("public", "ipv4").ip + "6001";

export const COOPERATIVE = localIpUrl("public", "ipv4").ip + "6001";

export const RETAILER = localIpUrl("public", "ipv4").ip + "6001";
