// #budgetController #DATABASE
var budgetController = (function () {

    /****Expense _ID, des, val_ ;************************************************** */
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    /***** Income _ID, des, val_ ; ******************************************************* */
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    /*********************************************************** */
    var calculateTotal = function (type) {
        var sum = 0;

        data.allItems[type].forEach(function (cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    /** data.allItems[type][data.allItems[type]******************************************************** */
    var data = {

        /*** data.allItems[type]*************************************************** */
        allItems: {
            exp: [],
            inc: [],
        },

        /*** data.totals[type]*************************************************** */
        totals: {
            exp: 0,
            inc: 0,
        },

        /************** data.budget**************** */
        budget: 0,
        percentage: -1
        /********************************************************* */

    };

    /****** budgetController. *********************************************** */
    return {

        /****** budgetController.addItem *************************************************************** */
        addItem: function (type, des, val) {


            var newItem, ID;

            /** budgetController.addItem.ID ************************************************* */
            //Create ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0
            }

            /*** budgetController.addItem.newItem************************************************ */
            //Create newItem
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            /******************************************************** */
            //Add data in stroage
            data.allItems[type].push(newItem);

            /******************************************************* */
            //Return the new element
            return newItem;
        },

        /*** budgetController.calculateBudget ************************************ */
        calculateBudget: function () {

            //totalIncome & totalexpenses       
            calculateTotal('exp');
            calculateTotal('inc');

            // buget = income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            //spent percentage 
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        /*** budgetController.getBudget  ********************************** */
        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage,
            }
        },

        /******** budgetController.deleteItem *****************************************/
        deleteItem: function (type, id) {
            var ids, index;

            ids = data.allItems[type].map(function (current) {
                return current.id;
            });
            index = ids.indexOf(id);
            
            if (index !== -1) {
                
                data.allItems[type].splice(index, 1);
            }

        }
    };

})();

// #UIController
var UIController = (function () {

    /*  DOMstring. ************************************************************** */
    var DOMstring = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLable: '.budget__value',
        incomeLable: '.budget__income--value',
        expenseLable: '.budget__expenses--value',
        percentageLable: '.budget__expenses--percentage',
        container: '.container',
    }

    /*** UIController. ****************************************************** */
    return {

        //*  UIController.return  ***************************************************************** *//
        getInput: function () {
            return {
                type: document.querySelector(DOMstring.inputType).value, //  inc  OR  exp
                description: document.querySelector(DOMstring.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstring.inputValue).value),
            };
        },

        //*** UIController.addListItem  **************************************************************//
        addListItem: function (obj, type) {

            var html, newHtml, element;

            //*  UIController.addListItem.html **********************************************************************/ 
            if (type === 'inc') {

                element = DOMstring.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            } else if (type === 'exp') {

                element = DOMstring.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">%%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            }

            /******* UIController.addListItem.newHtml**********************************************************************************/
            //input data in html
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            /*insert html to DOM******* element = DOMstring.expensesContainer _type_ *********************************** */
            document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);

        },

        /** UIController.clearFields ******************************************* */
        clearFields: function () {
            var fields, fieldsArr;

            /*****UIController.clearFields.fields == DOMstring.inputDescription & g.inputvalue value*************************************** */
            fields = document.querySelectorAll(DOMstring.inputDescription + ',' + DOMstring.inputValue);

            /*************casting fields to Array *****************************  */
            fieldsArr = Array.prototype.slice.call(fields);

            /***************** clean the add box  ******************** */
            fieldsArr.forEach(function (current, index, array) {
                current.value = "";
            });
            fieldsArr[0].focus();
        },

        /** UIController.displayBudget ******************************************* */
        displayBudget: function (obj) {

            document.querySelector(DOMstring.budgetLable).textContent = obj.budget;
            document.querySelector(DOMstring.incomeLable).textContent = obj.totalInc;
            document.querySelector(DOMstring.expenseLable).textContent = obj.totalExp;

            if (obj.percentage > 0) {
                document.querySelector(DOMstring.percentageLable).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstring.percentageLable).textContent = " --- ";
            }
        },
        /**UIController.******************************************* */

        /**  UIController.getDOMstring.  == protected value access  */
        getDOMstring: function () {
            return DOMstring;
        },

    };

})();

/***************************************************************************/
/* Global appController == main function **************************************/
var Controller = (function (budgetCtr, UICtr) {

    /** Controller.init Allwyas Run setupEventListeners *************************************************************** */
    var setupEventListeners = function () {
        var DOM = UICtr.getDOMstring();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    }

    /**** updateBudget ************************************************************************************ */
    var updateBudget = function () {

        //cal buget
        budgetCtr.calculateBudget();

        //return buget
        var budget = budgetCtr.getBudget();

        //display on UI
        UICtr.displayBudget(budget);

    };
    /****** main ADD  function************************************** */
    var ctrlAddItem = function () {
        var input, newItem;

        //filed input value
        input = UICtr.getInput();

        if (input.description != "" && !isNaN(input.value) && input.value > 0) {
            //Add item to storage
            newItem = budgetCtr.addItem(input.type, input.description, input.value);

            //add item to DOM
            UICtr.addListItem(newItem, input.type);

            //Inpux bux clear
            UICtr.clearFields();

            //update buget
            updateBudget();
        }

    };

    /*********** Delete Function **************************************** */
    var ctrlDeleteItem = function (event) {

        var itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {

            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt( splitID[1]);

            //delete from data
            budgetCtr.deleteItem(type, ID);

            //delete from UI

        }

    }
    /* Controller.init  ==> Controller.setupEventListeners Is Allwyas Run ********************* */
    return {
        init: function () {
            console.log('init has run.');
            UICtr.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1,
            })
            setupEventListeners();
        }
    };


})(budgetController, UIController);


Controller.init();