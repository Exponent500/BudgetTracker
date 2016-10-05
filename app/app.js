//create Angular module
var myApp = angular.module('BudgetTracker', []); 

//create Angular controller and inject scope/http into it
myApp.controller('MainController', ['$scope', function($scope){ 

  $scope.listOfIncomeItems = [];
  $scope.listOfExpenseItems = [];

  //displays $0 at page load, for both totalIncome and totalExpenses
  $scope.totalIncome = 0;
  $scope.totalExpenses = 0;

  //hides the alert box that tells the user that their rent/mortgage payments are 25% or greater than their income
  $scope.paymentsLargerThan25PercentOfIncome = false;

  //initializes the total rent/mortgage payments to 0 dollars
  var totalRentOrMortgagePayments = 0;
  
  //creates a new income item and adds it ot the listOfIncomeItems array
  $scope.addIncome = function(){

    if ($scope.incomeDescription === undefined) {
      return;
    }

    $scope.totalIncome += $scope.incomeAmount; //adds the latest income entry to a running total

    if((totalRentOrMortgagePayments/$scope.totalIncome) >='.25'){
      $scope.paymentsLargerThan25PercentOfIncome = true;
    } else {
      $scope.paymentsLargerThan25PercentOfIncome = false;
    }

    var incomeItem = {
      amount: $scope.incomeAmount,
      description: $scope.incomeDescription
    };

    //pushes new incomeItem to listOfIncomeItems array
    $scope.listOfIncomeItems.push(incomeItem);
  };

  //called when user clicks on the Add Expense Button
  $scope.addExpense = function(){

    //checks to see if nothing was entered into the Expense Description field, and if so, return right away
    if ($scope.expenseDescription === undefined) {
      return;
    }

    //adds the latest expense entry to a running total
    $scope.totalExpenses += $scope.expenseAmount; 

    // checks to see if Expense description is "rent", "home", or "mortage". If so, it adds to a running tally of rent/mortgage payments
    if ($scope.expenseDescription.toLowerCase() === 'rent' || $scope.expenseDescription.toLowerCase() === 'home' || $scope.expenseDescription.toLowerCase() === 'mortgage'){
      totalRentOrMortgagePayments += $scope.expenseAmount;
    }    
    
    //checks to see if the total rent/mortgage payments are 25% or more of the total income
    if((totalRentOrMortgagePayments/$scope.totalIncome) >='.25'){
      $scope.paymentsLargerThan25PercentOfIncome = true;
    } else {
      $scope.paymentsLargerThan25PercentOfIncome = false;
    }

    //creaetes a new expenseItem
    var expenseItem = {
      amount: $scope.expenseAmount,
      description: $scope.expenseDescription
    };

    //pushes new expenseItem to listOfExpenseItems array
    $scope.listOfExpenseItems.push(expenseItem);
  };

}]);
