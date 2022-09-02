export const data = [
  {
    name: 'iCloud Drive',
    icon: require('../assests/cloud.png'),
    onPress: console.log('first'),
    id: 1,
  },
  {
    name: 'On My iPhone',
    icon: require('../assests/smartphone.png'),
    onPress: 'OnMyPhone',
    id: 2,
  },
  {
    name: 'Recently Deleted',
    icon: require('../assests/trash.png'),
    onPress: console.log('first'),

    id: 3,
  },
];
export const TagsData = [
  {
    name: 'Green',
    id: 1,
  },
  {
    name: 'Orange',
    id: 2,
  },
  {
    name: 'Yellow',
    id: 3,
  },
  {
    name: 'blue',
    id: 4,
  },
  {
    name: 'Red',
    id: 5,
  },
  {
    name: 'Purple',
    id: 6,
  },
  {
    name: 'Gray',
    id: 7,
  },
];
export const gridData = [
  {
    headData: [
      {
        name: 'Select',
        icon: require('../assests/correct.png'),

        id: 1,
      },
      {
        name: 'New Folder',
        icon: require('../assests/add-folder.png'),

        id: 2,
      },
      {
        name: 'Connect to Server',
        icon: require('../assests/monitor.png'),

        id: 3,
      },
    ],
    topItem: [
      {
        name: 'Icons',
        icon: require('../assests/gridBlack.png'),

        id: 1,
      },
      {
        name: 'List',
        icon: require('../assests/list.png'),

        id: 2,
      },
    ],
    midItem: [
      {
        name: 'Name',

        id: 1,
      },
      {
        name: 'Kind',
        id: 2,
      },
      {
        name: 'Date',
        id: 3,
      },
      {
        name: 'Size',
        id: 4,
      },
      {
        name: 'Tags',
        icon: 'fdd',
        id: 5,
      },
    ],
    botomItem: [
      {
        name: 'Use Groups',
        id: 1,
      },
      {
        name: 'GroupBy',
        id: 2,
      },
    ],
  },
];
export const browseMenuName = [
  {
    name: 'Scan Documents',
    icon: require('../assests/scanner.png'),
    id: 1,
  },
  {
    name: 'Connect to Server',
    icon: require('../assests/monitor.png'),
    id: 2,
  },

  {
    name: 'Edit',
    id: 3,
  },
];

export const FilesData = [
  {
    folderName: 'Download',
    createdOn: '24/3/22',
    imageUri: '',
    size: '',
    location: '',
    timestamp: '1654255521.825',
    type: '',
    items: 8,
    data: [],
  },
  {
    folderName: 'Document',
    createdOn: '2/3/22',
    items: 2,
    data: [],
  },
  {
    folderName: 'Images',
    createdOn: '24/4/22',
    items: 3,
    data: [
      {
        folderName: '',
        createdOn: '24/3/22',
        imageUri: '',
        size: '',
        location: '',
        timestamp: '',
        type: '',
        items: 5,
      },
    ],
  },
  {
    folderName: 'Videos',
    createdOn: '24/2/22',
    items: 4,
    data: [
      {
        folderName: '',
        createdOn: '24/3/22',
        imageUri: '',
        size: '',
        location: '',
        timestamp: '',
        type: '',
        items: 5,
      },
    ],
  },
  {
    folderName: 'Audio',
    createdOn: '24/2/22',
    items: 4,
    data: [
      {
        folderName: '',
        createdOn: '24/3/22',
        imageUri: '',
        size: '',
        location: '',
        timestamp: '',
        type: '',
        items: 5,
      },
    ],
  },
  {
    folderName: 'More',
    createdOn: '24/2/22',
    items: 4,
    data: [
      {
        folderName: '',
        createdOn: '24/3/22',
        imageUri: '',
        size: '',
        location: '',
        timestamp: '',
        type: '',
        items: 5,
      },
    ],
  },
];
export const Photos = [
  {
    title: 'A',
    description: 'Photo to display',
    enableGrid: false,
    media: [
      {
        photo: 'A',
        title: 'A',
      },
    ],
  },
];

export const fileAction = [
  {
    name: 'Get Info',
    icon: require('../assests/scanner.png'),
    id: 1,
  },
  {
    name: 'Rename',
    icon: require('../assests/monitor.png'),
    id: 2,
  },
  {
    name: 'Compress',
    id: 3,
  },
  {
    name: 'Duplicate',
    id: 4,
  },
  {
    name: 'Tags',
    id: 5,
  },
  {
    name: 'Favorite',
    id: 6,
  },
  {
    name: 'Copy',
    id: 7,
  },

  {
    name: 'Move',
    id: 8,
  },
  {
    name: 'Share',
    id: 9,
  },
  {
    name: 'Delete',
    id: 10,
  },
];
