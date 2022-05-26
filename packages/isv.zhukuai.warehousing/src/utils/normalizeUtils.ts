import { ItemEntry } from '../components/fancyLists';

const traverseTree = (node, fn) => {
  if (!node || !node.children) {
    return;
  }
  node = fn(node);
  node.children.forEach(function (item) {
    traverseTree(item, fn);
  });
};

const parseTreeData = (treeNode: any) => {
  treeNode['label'] = treeNode['title'];
  treeNode['value'] = JSON.stringify({
    key: treeNode['key'],
    title: treeNode['title'],
  });
  return treeNode;
};

const traverseAndParseTreeData = tree => {
  const T = tree;
  traverseTree(T, parseTreeData);
  console.log('TREE', T);
  return T;
};

interface ListDataParse {
  key: string;
  label: string;
  icon?: string;
  index?: number;
  title?: boolean;
}

const parseListData = (ListData: Array<any>, parser: Array<ListDataParse>) => {
  const parserKeys = parser.map(item => item.key);
  const parseList = [...ListData];
  const parsedList = [];
  parseList.forEach(item => {
    const parsedItem = {
      ...item,
      children: [],
    };
    for (const key in item) {
      if (parserKeys.includes(key)) {
        const parseEntry = parser.filter(parser => parser.key === key)[0];
        const newItem: ItemEntry = {
          itemLabel: '',
          itemValue: '',
          index: 0,
        };
        newItem.itemLabel = parseEntry.label;
        newItem.itemValue = item[key];
        if (parseEntry.icon) {
          newItem['itemIcon'] = parseEntry.icon;
        }
        if (parseEntry.index) {
          newItem['index'] = parseEntry.index;
        }
        if (parseEntry.title) {
          newItem['title'] = true;
        }
        if (item['xuan'] === 1) {
          newItem.selected = true;
        }
        parsedItem.children.push(newItem);
      }
    }
    parsedItem.children.sort((a: ItemEntry, b: ItemEntry) => a.index - b.index);
    parsedList.push(parsedItem);
  });
  return parsedList;
};

const searchTree = (tree, key, value) => {
  if (tree[key] === value) {
    return tree;
  } else if (tree['children']) {
    let res = null;
    for (let i = 0; i < tree['children'].length; i++) {
      res = searchTree(tree['children'][i], key, value);
      if (res) {
        break;
      }
    }
    return res;
  }
  return null;
};

const uniqueArrayByKey = (arr: Array<any>, keys: Array<string>) => {
  const res = [];
  const hash = new Map();
  for (let i = 0; i < arr.length; i++) {
    const key = keys.map(key => arr[i][key]).join(',');
    if (!hash.has(key)) {
      hash.set(key, true);
      res.push(arr[i]);
    }
  }
  return res;
};

export {
  traverseAndParseTreeData,
  parseListData,
  searchTree,
  uniqueArrayByKey,
};
