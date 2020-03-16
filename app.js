//budgetController #DATABASE
var budgetController = (function () {

    /************************************************************* */
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    /************************************************************ */
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    /********************************************************** */
    var data = {

        /****************************************************** */
        allItems: {
            exp: [],
            inc: [],
        },

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

            /********************************************************************** */
            //Create ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0
            }

            /************************************************************ */
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
//
//UIController
var UIController = (function () {

    /*************************************************************** */
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

        //********************************************************************************* *//
        getInput: function () {
            return {
                type: document.querySelector(DOMstring.inputType).value, //  inc  OR  exp
                description: document.querySelector(DOMstring.inputDescription).value,
                value: document.querySelector(DOMstring.inputValue).value,
            };
        },

        //*********************************************************************************//
        addListItem: function (obj, type) {

            var html, newHtml, element;

            //*Html*********************************************************************************/
            // 
            if (type === 'inc') {

                element = DOMstring.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {

                element = DOMstring.expensesContainer;

                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">%%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            /*****************************************************************************************/
            //input data in html
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            /*************************************************************************************** */
            //insert html to DOM
            document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);

        },

        /***************************************************** */
        getDOMstring: function () {
            return DOMstring;
        },

        /********************************************* */
    };

})();
//
// Global appController
var Controller = (function (budgetCtr, UICtr) {

    /************************************************************************************** */
    var setupEventListeners = function () {
        var DOM = UICtr.getDOMstring();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }

    /**************************************************************************************** */
    var ctrlAddItem = function () {
        var input, newItem;

        //filed input value
        input = UICtr.getInput();

        //Add item to storage
        newItem = budgetCtr.addItem(input.type, input.description, input.value);

        //add item to DOM
        UICtr.addListItem(newItem, input.type);
    };

    /************************************************************************************** */
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