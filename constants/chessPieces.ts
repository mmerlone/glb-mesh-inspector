export const CHESS_PIECE_DESIGNATIONS = [
  '', // No designation
  'King',
  'Queen',
  'Rook',
  'Bishop',
  'Knight',
  'Pawn',
] as const;

export type ChessPieceDesignation = typeof CHESS_PIECE_DESIGNATIONS[number]; 