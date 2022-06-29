import { List } from 'antd-mobile';
import React from 'react';

interface ItemEntry {
  itemLabel: string;
  itemValue: string;
  itemIcon?: string;
  index: number;
  title?: boolean;
  selected?: boolean;
}

interface FancyListEntryProps {
  entry: ItemEntry;
}

const FancyListEntry: React.FC<FancyListEntryProps> = props => {
  const { entry } = props;
  const renderIcon = (entry: ItemEntry) => {
    if (entry.itemIcon) {
      return (
        <div
          className="fancy-list-item-entry-icon-wrapper"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <img
            style={{ width: '100%', height: '100%' }}
            className="fancy-list-item-entry-icon"
            src={entry.itemIcon}
            alt={entry.itemLabel}
          />
        </div>
      );
    } else {
      return null;
    }
  };
  return (
    <div
      className={`fancy-list-item-entry ${entry.title ? 'title-entry' : ''} ${
        entry.selected ? 'selected-entry' : ''
      }`}
    >
      {renderIcon(entry)}
      <span className="fancy-list-item-entry-label">{entry.itemLabel}</span>
      {'：'}
      <span className="fancy-list-item-entry-value">{entry.itemValue}</span>
    </div>
  );
};

interface FancyListItemProps {
  itemData: FancyListItemData;
  onClick: (item: FancyListItemData) => void;
}

const FancyListStyle = `
    .fancy-list-item {
        padding: 6px 8px;
        width: calc(100vw - 16px);
        display: flex;
        flex-direction: column;
        margin-bottom: 8px;
        border-bottom:8px solid rgb(239, 239, 239);
        justify-content: space-between;
        background-color: #fff;
        
    }
    .fancy-list-item .fancy-list-item-entry { 
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        font-size: 14px;
        color: #666;
    }
    .fancy-list-item .fancy-list-item-entry .fancy-list-item-entry-icon-wrapper { 
        width: 16px;
        height: 16px;
    }
    .fancy-list-item .fancy-list-item-entry.title-entry {
        font-size: 16px;
        font-weight: bold;
        color: #333;
        line-height: 20px;
    }
    .fancy-list-item .fancy-list-item-entry.selected-entry.title-entry {
        color: #000000
    }
    .fancy-list-item .fancy-list-item-entry.selected-entry {
        color: #ABABAB;
    }
    .fancy-list-item .fancy-list-item-entry .fancy-list-item-entry-value { 
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 75%;
     }
     .fancy-list-item .fancy-list-item-entry:last-child { 
         margin-bottom: 0;
     }
     .fancyl-list-empty {
         max-width: 100vw;
     }
`;

const FancyListItem: React.FC<FancyListItemProps> = props => {
  const { itemData, onClick } = props;
  return (
    <div
      className="fancy-list-item"
      onClick={() => {
        onClick(itemData);
      }}
    >
      {itemData.children.map(item => (
        <FancyListEntry key={item.itemLabel} entry={item} />
      ))}
    </div>
  );
};

interface FancyListItemData {
  id?: string;
  children: ItemEntry[];
  [key: string]: any;
}

interface FancyListProps {
  data: FancyListItemData[];
  itemClick: (item: FancyListItemData) => void;
}
const FancyList: React.FC<FancyListProps> = props => {
  const { data, itemClick } = props;
  return (
    <div
      className="fancy-list-background"
      style={{ backgroundColor: '#efefef', minHeight: '100vh', width: '100vw' }}
    >
      {data.length === 0 ? (
        <div
          className="fancy-list-empty"
          style={{
            maxWidth: '100vw',
            maxHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={
              'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//8SyQKD2DCh1638868050008.png'
            }
            style={{
              maxWidth: '75%',
              maxHeight: '75%',
            }}
          />
        </div>
      ) : (
        <List
          style={{
            backgroundColor: '#efefef',
            padding: '6px 8px',
            maxWidth: '100vw',
          }}
        >
          <style>{FancyListStyle}</style>
          {data.map(item => (
            <FancyListItem
              key={item.id}
              itemData={item}
              onClick={() => {
                itemClick(item);
              }}
            />
          ))}
        </List>
      )}
    </div>
  );
};

export { ItemEntry, FancyListItem, FancyListEntry, FancyList };
