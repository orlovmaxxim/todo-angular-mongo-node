'use strict';

let appTodo = angular.module('appTodo', []);

function mainController($scope, $http) {
    $scope.formData = {};
    $scope.task = {};

    // get all lists and show on the page
    $http.get('/api/lists')
        .success(function(data) {
            $scope.lists = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // send the text list to the node API (submitting new list)
    $scope.createList = function() {
        $http.post('/api/lists', $scope.formData)
            .success(function(data) {
                console.log($scope.formData);
                // clear the form
                $scope.formData = {}; 
                $scope.lists = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a list
    $scope.deleteList = function(id) {
        $http.delete('/api/lists/' + id)
            .success(function(data) {
                $scope.lists = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // change name of todo list
    $scope.isChecked = false;
    $scope.editTodoListName = function(list) {
      $scope.editedList = list;
			$scope.originalList = angular.extend({}, list);
    };

    $scope.saveEdits = function(list, id) {
      if (list.name === $scope.originalList.name) {
				$scope.editedList = null;
				return;
      }

      $http.put('/api/lists/' + id, $scope.editedList)
        .success(function(data) {
            $scope.editedList = null;
            //$scope.lists = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // add new task in array on the todo list
    $scope.addTask = function(tasktext, id) {
      $scope.task.text = tasktext;
      $http.post('/api/lists/' + id + '/task', $scope.task)
      .success(function(data) {
          $scope.task = {};
          // console.log($scope.lists.tasks);
          // $scope.lists.tasks = data;
      })
      .error(function(data) {
          console.log('Error: ' + data);
      });
    };
}
  