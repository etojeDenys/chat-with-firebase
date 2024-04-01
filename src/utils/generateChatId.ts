export const generateChatId = (uid: string, userUid: string) =>
  uid > userUid ? `${uid + userUid}` : `${userUid + uid}`;
