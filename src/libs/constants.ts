export enum CollectionColors {
  Hyper = 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500',
  Oceanic = 'bg-gradient-to-r from-green-300 via-blue-500 to-purple-600',
  Sunset = 'bg-gradient-to-r from-amber-500 to-red-600',
  Midnight = 'bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900'
}

export type CollectionColor = keyof typeof CollectionColors;