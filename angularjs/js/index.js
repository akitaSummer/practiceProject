angular.module('myApp', [])
    .controller('MyCtrl1', ['$scope', function($scope) {
        $scope.message = ''
        $scope.getCount = function() {
            if ($scope.message.length > 100) {
                $scope.message = $scope.message.slice(0, 100)
            }
            return 100 - $scope.message.length
        }
        $scope.save = function() {
            localStorage.setItem('note_key', JSON.stringify($scope))
            alert('note is saved')
            $scope.message = ''
        }
        $scope.read = function() {
            $scope.message = JSON.parse(localStorage.getItem('note_key') || '')
        }
        $scope.remove = function() {
            localStorage.removeItem('note_key')
            $scope.message = ''
        }
    }])
    .controller('MyCtrl2', ['$scope', function($scope) {
        $scope.todos = [{
                name: 'eat',
                check: false
            },
            {
                name: 'sleep',
                check: false
            }
        ]
        $scope.newTodo = ''
        $scope.add = function() {
            if ($scope.newTodo.length > 0) {
                $scope.todos.push({
                    name: $scope.newTodo,
                    check: false
                })
                $scope.newTodo = ''
            }
        }
        $scope.del = function() {
            $scope.todos = $scope.todos.filter(item => {
                return !item.check
            })
        }
    }])