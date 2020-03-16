//budgetController #DATABASE
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

        /********************************************************* */

    };

    /***************************************************** */
    return {
        addItem: function (type, des, val) {


            var newItem, ID;

            /** budgetController.ID ******************************************************************** */
            //Create ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0
            }

            /*** budgetController.newItem************************************************ */
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

    };

    /********************************************* */
})();

/****************************************************************************/
/*UIController***************************************************************/
var UIController = (function () {

    /*  DOMstring. ************************************************************** */
    var DOMstring = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
    }

    /********************************************************** */
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

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {

                element = DOMstring.expensesContainer;

                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">%%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
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
        /**UIController.******************************************* */

        /**UIController.******************************************* */

        /**  UIController.getDOMstring.  == protected value access ************************************************* */
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
    }

    /**** updateBudget ************************************************************************************ */
    var updateBudget = function () {

        //cal buget

        //return buget

        //display on UI

    };
    /****** main function********************************************************************************** */
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

    /* Controller.init  ==> Controller.setupEventListeners Is Allwyas Run ********************* */
    return {
        init: function () {
            console.log('init has run.');
            setupEventListeners();
        }
    };

    /************************************************************************************ */

})(budgetController, UIController);

/************************************************************************************ */
Controller.init();