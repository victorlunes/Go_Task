export const generateUniqueIdWithTimestamp = (): string => {
    const timestamp = new Date().getTime().toString(36)
    const radomPart = Math.random().toString(36).substring(2, 9)
    return `${timestamp}-${radomPart}`;
}