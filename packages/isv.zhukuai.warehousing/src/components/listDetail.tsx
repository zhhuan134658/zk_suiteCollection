import React, { useEffect } from 'react';
import { List, Result } from 'antd-mobile';
import { searchTree } from '../utils/normalizeUtils';
import { ExclamationCircleOutline, RightOutline } from 'antd-mobile-icons';

const DetailList: React.FC<{
  cascadeData: Array<any>;
  showTypes: boolean;
  itemClick: (item: any) => void;
  sideChange: (key: any) => void;
  rightListData: Array<any>;
}> = props => {
  const { cascadeData, itemClick, sideChange, rightListData, showTypes } =
    props;

  const listItemStyle: React.CSSProperties = {
    fontSize: '16px',
  };
  const listSpanStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '8px',
    paddingBottom: '8px',
  };
  const renderItemEntry = (item: any) => {
    return (
      <List.Item
        className="item-entry"
        onClick={itemClick.bind(this, item)}
        key={item.key}
        style={listItemStyle}
      >
        {item.unit ? (
          <span style={listSpanStyle}>
            <span
              style={{
                color: '#333',
              }}
            >
              {item.name}/
            </span>
            <span
              style={{
                color: '#666',
              }}
            >
              {item.unit}/
            </span>
            <span
              style={{
                color: '#999',
              }}
            >
              {item.size}
            </span>
          </span>
        ) : (
          <span style={listSpanStyle}> {item.name}</span>
        )}
      </List.Item>
    );
  };
  const itemList = (itemList: Array<any>) => {
    return (
      <List>
        {itemList.map((item: any) => {
          return renderItemEntry(item);
        })}
      </List>
    );
  };

  const [childrenList, setChildrenList] = React.useState([]);
  const [navList, setNavList] = React.useState([{ title: '全部', key: '0' }]);
  const setNav = (key: any) => {
    const index = navList.findIndex(item => item.key === key);
    navList.splice(index + 1, navList.length - index - 1);
    if (navList.length === 0) {
      navList.push({ title: '全部', key: '0' });
      setNavList(navList);
    } else {
      setNavList(navList);
    }
    sideChange(key);
  };
  const setNavChildren = (key: any) => {
    const navNode = searchTree(cascadeData[0], 'key', key);
    if (navNode && navNode.children) {
      setChildrenList(navNode.children);
    }
  };
  const setTypeStyle = () => {
    return {
      ...{ color: '#333' },
      ...listSpanStyle,
    };
  };
  const renderTypeEntry = (navItem: any) => {
    return (
      <List.Item
        className="nav-entry"
        onClick={() => {
          console.log('nav', navItem);
          setNavChildren(navItem.key);
          sideChange(navItem.key);
          navList.push(navItem);
          setNavList(navList);
        }}
        style={listItemStyle}
      >
        <span
          style={setTypeStyle()}
        >{`${navItem.title}(${navItem['quantity']})`}</span>
      </List.Item>
    );
  };
  const typeList = (typeList: Array<any>) => {
    return (
      <List>
        {typeList.map((navItem: any) => {
          return renderTypeEntry(navItem);
        })}
      </List>
    );
  };

  useEffect(() => {
    console.log('CASCADE', cascadeData);
    if (
      cascadeData.length > 0 &&
      cascadeData[0]['children'] &&
      cascadeData[0]['children'].length > 0
    ) {
      setChildrenList(cascadeData[0]['children']);
    }
  }, [cascadeData]);
  return (
    <div
      className="materialDetail"
      style={{
        width: '100vw',
        height: '100%',
        backgroundColor: '#F2F1F6',
      }}
    >
      {showTypes && (
        <div
          className="material-cascade-nav"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FFF',
            marginBottom: '12px',
          }}
        >
          {navList.map((item: any, index: number) => {
            return (
              <div
                className={
                  'material-cascade-nav-item' +
                  (index === navList.length - 1
                    ? ' material-cascade-nav-item-last'
                    : '')
                }
                style={
                  index === 0
                    ? {
                        paddingTop: '8px',
                        paddingBottom: '8px',
                        paddingLeft: '16px',
                        fontSize: '16px',
                      }
                    : {
                        paddingTop: '8px',
                        paddingBottom: '8px',
                        fontSize: '16px',
                      }
                }
                key={item.key}
                onClick={() => {
                  setNav(item.key);
                  setNavChildren(item.key);
                }}
              >
                <span
                  style={
                    index !== navList.length - 1
                      ? { color: '#0089FF' }
                      : { color: '#666' }
                  }
                >
                  {`${item.title}`}
                  {index !== navList.length - 1 && (
                    <RightOutline color="#666" />
                  )}
                </span>
              </div>
            );
          })}
        </div>
      )}
      {childrenList.length > 0 && showTypes && (
        <div
          className="material-cascade-types"
          style={{
            marginBottom: '12px',
          }}
        >
          {typeList(childrenList)}
        </div>
      )}
      {rightListData.length > 0 && itemList(rightListData)}
      {rightListData.length === 0 && (
        <Result
          title={'暂无数据'}
          img={
            <ExclamationCircleOutline
              color="var(--adm-color-light)"
              fontSize={48}
            />
          }
          style={{
            color: '#999',
            backgroundColor: '#FFF',
          }}
        />
      )}
    </div>
  );
};

export { DetailList };
