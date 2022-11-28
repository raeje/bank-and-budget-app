const LoadData = (id, file) => {
  localStorage.setItem(id, JSON.stringify(file));
  console.log("Data loaded:", localStorage);
};

export default LoadData;
