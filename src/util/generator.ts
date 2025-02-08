
export const generateRoomId = (IdOne: string, IdTwo: string) => {
  const roomId = IdOne < IdTwo
    ? `${IdOne}-${IdTwo}`
    : `${IdTwo}-${IdOne}`
  return roomId
}