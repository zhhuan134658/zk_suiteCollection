const searchBarSubmit = (_this: any, value: any, type: any) => {
  const newData = _this.state.allData;
  console.log('new submit', value);
  newData.name = value;
  _this.asyncSetFieldProps(newData, type);
};

const searchBarChange = (_this: any, value: any, type: any) => {
  if (!value) {
    searchBarSubmit(_this, '', type);
  }
  _this.setState({
    SearchBarvalue: value,
  });
};

const searchBarSubmitRK = (_this: any, value: any, rk_id: string) => {
  const newData = _this.state.allData;
  newData.name = value;
  newData.page = 1;
  newData.rk_id = [rk_id];
  console.log('searchParams', newData);
  _this.setState({
    allData: newData,
  });
  _this.asyncSetFieldProps(newData);
};

export { searchBarSubmit, searchBarChange, searchBarSubmitRK };
