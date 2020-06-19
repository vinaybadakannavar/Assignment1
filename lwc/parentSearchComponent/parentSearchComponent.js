import { LightningElement, wire, track } from "lwc";
import getAccounts from "@salesforce/apex/SearchController.getAccounts";
export default class ChildSearchCompOne extends LightningElement {
  nameSearch;
  numberOfRecords;
  filterValue;
  error;
  @track accRecords;
  @track copyOfAccountRecords;

  constructor() {
    super();
    getAccounts()
      .then((result) => {
        console.log("result = " + result);
        this.accRecords = result;
        this.copyOfAccountRecords = [...this.accRecords]; // Shallow Copy Of Records
      })
      .catch((error) => {
        this.error = error;
      });
  }

  handleChange(event) {
    if (event.target.name == "Name") {
      this.nameSearch = event.target.value;
    } else if (event.target.name == "Records") {
      this.numberOfRecords = event.target.value;
    } else if (event.target.name == "filterValue") {
      this.filterValue = event.target.value;
    } 
  }

  /* Initial Search */
  handleClick() {
    getAccounts({
      numberOfRecords: this.numberOfRecords,
      name: this.nameSearch
    })
      .then((result) => {
        console.log("result = " + result);
        this.accRecords = result;
        this.copyOfAccountRecords = [...result];
      })
      .catch((error) => {
        this.error = error;
      });
  }

  /* Filter The Records */
  handleFilter() {
    //this.copyOfAccountRecords =[];
    let filter = this.filterValue;
    this.copyOfAccountRecords = this.accRecords.filter(temp => temp.Name.includes(filter));

  }
}