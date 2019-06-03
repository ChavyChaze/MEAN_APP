const app = angular.module('app', []);

app.controller('AppCtrl', ($scope, $http) => {
  $scope.filteredEmployers = [],
  $scope.currentPage = 1,
  $scope.numPerPage = 10,
  $scope.maxSize = 5;

  $http
    .get('/api/employers')
    .then(response => {
      $scope.$watch('currentPage + numPerPage', () => {
        const begin = (($scope.currentPage - 1) * $scope.numPerPage),
        end = begin + $scope.numPerPage;

        $scope.employers = response.data.slice(begin, end);
      })
    })
    .catch(err => {
      console.log(`Error ${err}`);
    });

  $scope.addEmployer = () => {
    $http
      .post('/api/employer', $scope.employer)
      .then(response => {
        location.reload();
      })
      .catch(err => {
        console.log(`Error ${err}`);
      });
  };

  $scope.remove = id => {
    $http
      .delete(`/api/employer/${id}`)
      .then(response => {
        location.reload();
      })
      .catch(err => {
        console.log(`Error ${err}`);
      });
  };

  $scope.edit = id => {
    $http
      .get(`/api/employer/${id}`)
      .then(response => {
        $scope.employer = response.data;
      })
      .catch(err => {
        console.log(`Error ${err}`);
      });
  };

  $scope.update = () => {
    $http
      .put(`/api/employer/${$scope.employer.empId}`, $scope.employer)
      .then(response => {
        location.reload();
      })
      .catch(err => {
        console.log(`Error ${err}`);
      });
  };

  $scope.deselect = () => {
    $scope.employer = '';
  }
});
