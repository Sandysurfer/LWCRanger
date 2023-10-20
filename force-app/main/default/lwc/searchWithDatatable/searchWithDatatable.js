/* eslint-disable default-case */
import { LightningElement } from "lwc";
import findAccountsData from "@salesforce/apex/LightningDataTableController.findAccountsData";
import deleteAccount from "@salesforce/apex/LightningDataTableController.deleteAccount";
import { NavigationMixin } from "lightning/navigation";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

const actions = [
  { label: "View", name: "view" },
  { label: "Edit", name: "edit" },
  { label: "Delete", name: "delete" }
];

const columns = [
  { label: "Name", fieldName: "Name" },
  { label: "Phone", fieldName: "Phone" },
  { label: "Fax", fieldName: "Fax" },
  { label: "Industry", fieldName: "Industry" },
  {
    type: "action",
    typeAttributes: { rowActions: actions }
  }
];

export default class SearchDatatable extends NavigationMixin(LightningElement) {
  searchValue;
  displayResult;
  columns = columns;

  handleSearchChange(event) {
    this.searchValue = event.target.value;
    this.imperativeCall();
  }

  imperativeCall() {
    findAccountsData({ searchAccount: this.searchValue })
      .then((result) => {
        console.log("Result is", result);
        this.displayResult = result;
      })
      .catch((error) => {
        console.log("Error Occured", error);
      });
  }

  handleRowAction(event) {
    const actionName = event.detail.action.name;
    console.log("Action Name", actionName);
    const row = event.detail.row;

    switch (actionName) {
      case "view":
        this[NavigationMixin.Navigate]({
          type: "standard__recordPage",
          attributes: {
            recordId: row.Id,
            actionName: "view"
          }
        });
        break;
      case "edit":
        this[NavigationMixin.Navigate]({
          type: "standard__recordPage",
          attributes: {
            recordId: row.Id,
            objectApiName: "Account",
            actionName: "edit"
          }
        });
        break;
      case "delete":
        this.deleteAccount(row);
        break;
    }
  }
  deleteAccount(currentRow) {
    deleteAccount({ accObj: currentRow })
      .then(() => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "success",
            message: currentRow.Name + "account deleted.",
            variant: "success"
          })
        );
      })
      .catch((error) => {
        console.log("Error", error);
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Error",
            message: JSON.stringify(error),
            variant: "error"
          })
        );
      });
  }
}