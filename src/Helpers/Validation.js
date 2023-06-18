export default class Validation {
  static checkData(start, end) {
    const startDate = new Date(start.value);
    const endDate = new Date(end.value);
    const p = end.nextSibling;

    if (endDate < startDate) {
      p.textContent = "Start date must be before end date";
      return false;
    }else if(!start.value.length || !end.value.length){
      p.textContent = 'Select date'
      return false
    } 

      p.textContent = "";
      return true;
    
  }

  static checkInput(inp) {
     const input = inp
    const p = inp.nextSibling;

    if(!input.value.length) {
        p.textContent = 'Required'
        return false
      
    }else {
      p.textContent = ''
      return true
    }
  }

  static checkSelect(sel) {
    const p = sel.nextSibling;
    if(sel.value == '') {
       p.textContent = 'Choose an employee'
       return false
    }else {
      p.textContent = ''
      return true
    }
  }
}
