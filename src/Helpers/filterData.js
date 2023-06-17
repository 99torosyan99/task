export default function filterData(data, size) {
    const newData = [];
    for (let i = 0; i < data.length; i += size) {
      newData.push(data.slice(i, i + size));
    }
    return newData;
  }