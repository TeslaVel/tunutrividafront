// mockSessions.js

export const mockSessions = {
  data: {
    sessions: {
      paginated: [
        {
          id: "46",
          age: "36",
          height: "1.58",
          weight: "77.3",
          waist: null,
          hip: null,
          highAbdomen: null,
          lowAbdomen: null,
          imc: "30.92",
          idealWeight: "77.3",
          bodyGrease: null,
          visceralGrease: null,
          muscleMass: null,
          boneMass: null,
          waterPercentage: null,
          bmr: "1231.6007",
          metabolicAge: null,
          physicalComplexion: null,
          date: "2023-04-23 12:00 am",
          activityFactor: {
            id: "1",
            name: "Sedentario",
            description: "(poco o ningun ejercicio)",
            __typename: "ActivityFactor"
          },
          diet: null,
          __typename: "Session"
        },
        {
          id: "45",
          age: "36",
          height: "1.58",
          weight: "78.0",
          waist: "111.0",
          hip: "118.0",
          highAbdomen: "86.0",
          lowAbdomen: "89.0",
          imc: "31.2",
          idealWeight: "78.0",
          bodyGrease: "42.7",
          visceralGrease: "8.0",
          muscleMass: "25.7",
          boneMass: null,
          waterPercentage: null,
          bmr: "1238.2248",
          metabolicAge: "55",
          physicalComplexion: null,
          date: "2023-03-23 12:00 am",
          activityFactor: {
            id: "1",
            name: "Sedentario",
            description: "(poco o ningun ejercicio)",
            __typename: "ActivityFactor"
          },
          diet: {
            id: "3",
            name: "John's Diet",
            description: "Descripcion de la dieta",
            dietMealWeeks: [
              {
                id: "8",
                dietId: "3",
                dayOfWeek: "sunday",
                createdAt: "2024-06-19 10:10 am",
                dietMealTimes: [
                  {
                    id: "22",
                    dietMealWeekId: "8",
                    mealTime: "breakfast",
                    createdAt: "2024-06-19 10:10 am",
                    dietIngredient: {
                      id: "22",
                      dietMealTimeId: "22",
                      mealId: "1",
                      instructions: "Agregar",
                      createdAt: "2024-06-19 10:10 am",
                      meal: {
                        id: "1",
                        name: "Avena con frutas y semillas",
                        __typename: "Meal"
                      },
                      __typename: "DietIngredient"
                    },
                    __typename: "DietMealTime"
                  },
                  {
                    id: "23",
                    dietMealWeekId: "8",
                    mealTime: "lunch",
                    createdAt: "2024-06-19 10:10 am",
                    dietIngredient: {
                      id: "23",
                      dietMealTimeId: "23",
                      mealId: "17",
                      instructions: "Agregar",
                      createdAt: "2024-06-19 10:10 am",
                      meal: {
                        id: "17",
                        name: "Pasta integral con salsa de tomate y verduras",
                        __typename: "Meal"
                      },
                      __typename: "DietIngredient"
                    },
                    __typename: "DietMealTime"
                  },
                  {
                    id: "24",
                    dietMealWeekId: "8",
                    mealTime: "dinner",
                    createdAt: "2024-06-19 10:10 am",
                    dietIngredient: {
                      id: "24",
                      dietMealTimeId: "24",
                      mealId: "42",
                      instructions: "Agregar",
                      createdAt: "2024-06-19 10:10 am",
                      meal: {
                        id: "42",
                        name: "Curry de garbanzos con arroz integral",
                        __typename: "Meal"
                      },
                      __typename: "DietIngredient"
                    },
                    __typename: "DietMealTime"
                  }
                ],
                __typename: "DietMealWeek"
              },
              {
                id: "9",
                dietId: "3",
                dayOfWeek: "monday",
                createdAt: "2024-06-19 10:10 am",
                dietMealTimes: [
                  {
                    id: "25",
                    dietMealWeekId: "9",
                    mealTime: "breakfast",
                    createdAt: "2024-06-19 10:10 am",
                    dietIngredient: {
                      id: "25",
                      dietMealTimeId: "25",
                      mealId: "8",
                      instructions: "Agregar",
                      createdAt: "2024-06-19 10:10 am",
                      meal: {
                        id: "8",
                        name: "Huevos revueltos con espinacas y tomate",
                        __typename: "Meal"
                      },
                      __typename: "DietIngredient"
                    },
                    __typename: "DietMealTime"
                  },
                  {
                    id: "26",
                    dietMealWeekId: "9",
                    mealTime: "lunch",
                    createdAt: "2024-06-19 10:10 am",
                    dietIngredient: {
                      id: "26",
                      dietMealTimeId: "26",
                      mealId: "23",
                      instructions: "Agregar",
                      createdAt: "2024-06-19 10:10 am",
                      meal: {
                        id: "23",
                        name: "Quiche de espinacas y champiñones",
                        __typename: "Meal"
                      },
                      __typename: "DietIngredient"
                    },
                    __typename: "DietMealTime"
                  },
                  {
                    id: "27",
                    dietMealWeekId: "9",
                    mealTime: "dinner",
                    createdAt: "2024-06-19 10:10 am",
                    dietIngredient: {
                      id: "27",
                      dietMealTimeId: "27",
                      mealId: "41",
                      instructions: "Agregar",
                      createdAt: "2024-06-19 10:10 am",
                      meal: {
                        id: "41",
                        name: "Berenjenas a la parmesana con ensalada",
                        __typename: "Meal"
                      },
                      __typename: "DietIngredient"
                    },
                    __typename: "DietMealTime"
                  }
                ],
                __typename: "DietMealWeek"
              },
              {
                id: "10",
                dietId: "3",
                dayOfWeek: "tuesday",
                createdAt: "2024-06-19 10:10 am",
                dietMealTimes: [
                  {
                    id: "28",
                    dietMealWeekId: "10",
                    mealTime: "breakfast",
                    createdAt: "2024-06-19 10:10 am",
                    dietIngredient: {
                      id: "28",
                      dietMealTimeId: "28",
                      mealId: "10",
                      instructions: "Agregar",
                      createdAt: "2024-06-19 10:10 am",
                      meal: {
                        id: "10",
                        name: "Burrito de desayuno con aguacate",
                        __typename: "Meal"
                      },
                      __typename: "DietIngredient"
                    },
                    __typename: "DietMealTime"
                  },
                  {
                    id: "29",
                    dietMealWeekId: "10",
                    mealTime: "lunch",
                    createdAt: "2024-06-19 10:10 am",
                    dietIngredient: {
                      id: "29",
                      dietMealTimeId: "29",
                      mealId: "24",
                      instructions: "Agregar",
                      createdAt: "2024-06-19 10:10 am",
                      meal: {
                        id: "24",
                        name: "Bowl de arroz con frijoles y aguacate",
                        __typename: "Meal"
                      },
                      __typename: "DietIngredient"
                    },
                    __typename: "DietMealTime"
                  },
                  {
                    id: "30",
                    dietMealWeekId: "10",
                    mealTime: "dinner",
                    createdAt: "2024-06-19 10:10 am",
                    dietIngredient: {
                      id: "30",
                      dietMealTimeId: "30",
                      mealId: "30",
                      instructions: "Agregar",
                      createdAt: "2024-06-19 10:10 am",
                      meal: {
                        id: "30",
                        name: "Pechuga de pollo a la parrilla con quinoa",
                        __typename: "Meal"
                      },
                      __typename: "DietIngredient"
                    },
                    __typename: "DietMealTime"
                  }
                ],
                __typename: "DietMealWeek"
              },
              {
                id: "11",
                dietId: "3",
                dayOfWeek: "wednesday",
                createdAt: "2024-06-19 10:10 am",
                dietMealTimes: [
                  {
                    id: "31",
                    dietMealWeekId: "11",
                    mealTime: "breakfast",
                    createdAt: "2024-06-19 10:10 am",
                    dietIngredient: {
                      id: "31",
                      dietMealTimeId: "31",
                      mealId: "14",
                      instructions: "Agregar",
                      createdAt: "2024-06-19 10:10 am",
                      meal: {
                        id: "14",
                        name: "Sandwich de aguacate y huevo pochado",
                        __typename: "Meal"
                      },
                      __typename: "DietIngredient"
                    },
                    __typename: "DietMealTime"
                  },
                  {
                    id: "32",
                    dietMealWeekId: "11",
                    mealTime: "lunch",
                    createdAt: "2024-06-19 10:10 am",
                    dietIngredient: {
                      id: "32",
                      dietMealTimeId: "32",
                      mealId: "17",
                      instructions: "Agregar",
                      createdAt: "2024-06-19 10:10 am",
                      meal: {
                        id: "17",
                        name: "Pasta integral con salsa de tomate y verduras",
                        __typename: "Meal"
                      },
                      __typename: "DietIngredient"
                    },
                    __typename: "DietMealTime"
                  },
                  {
                    id: "33",
                    dietMealWeekId: "11",
                    mealTime: "dinner",
                    createdAt: "2024-06-19 10:10 am",
                    dietIngredient: {
                      id: "33",
                      dietMealTimeId: "33",
                      mealId: "43",
                      instructions: "Agregar",
                      createdAt: "2024-06-19 10:10 am",
                      meal: {
                        id: "43",
                        name: "Tortitas de avena con frutas frescas",
                        __typename: "Meal"
                      },
                      __typename: "DietIngredient"
                    },
                    __typename: "DietMealTime"
                  }
                ],
                __typename: "DietMealWeek"
              },
              {
                id: "12",
                dietId: "3",
                dayOfWeek: "thursday",
                createdAt: "2024-06-19 10:10 am",
                dietMealTimes: [
                  {
                    id: "34",
                    dietMealWeekId: "12",
                    mealTime: "breakfast",
                    createdAt: "2024-06-19 10:10 am",
                    dietIngredient: {
                      id: "34",
                      dietMealTimeId: "34",
                      mealId: "12",
                      instructions: "Agregar",
                      createdAt: "2024-06-19 10:10 am",
                      meal: {
                        id: "12",
                        name: "Gachas de avena con frutas",
                        __typename: "Meal"
                      },
                      __typename: "DietIngredient"
                    },
                    __typename: "DietMealTime"
                  },
                  {
                    id: "35",
                    dietMealWeekId: "12",
                    mealTime: "lunch",
                    createdAt: "2024-06-19 10:10 am",
                    dietIngredient: {
                      id: "35",
                      dietMealTimeId: "35",
                      mealId: "27",
                      instructions: "Agregar",
                      createdAt: "2024-06-19 10:10 am",
                      meal: {
                        id: "27",
                        name: "Berenjenas rellenas de quinoa",
                        __typename: "Meal"
                      },
                      __typename: "DietIngredient"
                    },
                    __typename: "DietMealTime"
                  },
                  {
                    id: "36",
                    dietMealWeekId: "12",
                    mealTime: "dinner",
                    createdAt: "2024-06-19 10:10 am",
                    dietIngredient: {
                      id: "36",
                      dietMealTimeId: "36",
                      mealId: "38",
                      instructions: "Agregar",
                      createdAt: "2024-06-19 10:10 am",
                      meal: {
                        id: "38",
                        name: "Hamburguesas vegetarianas con batatas asadas",
                        __typename: "Meal"
                      },
                      __typename: "DietIngredient"
                    },
                    __typename: "DietMealTime"
                  }
                ],
                __typename: "DietMealWeek"
              },
              {
                id: "13",
                dietId: "3",
                dayOfWeek: "friday",
                createdAt: "2024-06-19 10:10 am",
                dietMealTimes: [
                  {
                    id: "37",
                    dietMealWeekId: "13",
                    mealTime: "breakfast",
                    createdAt: "2024-06-19 10:10 am",
                    dietIngredient: {
                      id: "37",
                      dietMealTimeId: "37",
                      mealId: "2",
                      instructions: "Agregar",
                      createdAt: "2024-06-19 10:10 am",
                      meal: {
                        id: "2",
                        name: "Tostadas con aguacate",
                        __typename: "Meal"
                      },
                      __typename: "DietIngredient"
                    },
                    __typename: "DietMealTime"
                  },
                  {
                    id: "38",
                    dietMealWeekId: "13",
                    mealTime: "lunch",
                    createdAt: "2024-06-19 10:10 am",
                    dietIngredient: {
                      id: "38",
                      dietMealTimeId: "38",
                      mealId: "25",
                      instructions: "Agregar",
                      createdAt: "2024-06-19 10:10 am",
                      meal: {
                        id: "25",
                        name: "Sándwich de pavo y queso",
                        __typename: "Meal"
                      },
                      __typename: "DietIngredient"
                    },
                    __typename: "DietMealTime"
                  },
                  {
                    id: "39",
                    dietMealWeekId: "13",
                    mealTime: "dinner",
                    createdAt: "2024-06-19 10:10 am",
                    dietIngredient: {
                      id: "39",
                      dietMealTimeId: "39",
                      mealId: "35",
                      instructions: "Agregar",
                      createdAt: "2024-06-19 10:10 am",
                      meal: {
                        id: "35",
                        name: "Brochetas de camarones y vegetales",
                        __typename: "Meal"
                      },
                      __typename: "DietIngredient"
                    },
                    __typename: "DietMealTime"
                  }
                ],
                __typename: "DietMealWeek"
              },
              {
                id: "14",
                dietId: "3",
                dayOfWeek: "saturday",
                createdAt: "2024-06-19 10:10 am",
                dietMealTimes: [
                  {
                    id: "40",
                    dietMealWeekId: "14",
                    mealTime: "breakfast",
                    createdAt: "2024-06-19 10:10 am",
                    dietIngredient: {
                      id: "40",
                      dietMealTimeId: "40",
                      mealId: "7",
                      instructions: "Agregar",
                      createdAt: "2024-06-19 10:10 am",
                      meal: {
                        id: "7",
                        name: "Yogur con frutas y frutos secos",
                        __typename: "Meal"
                      },
                      __typename:'dietIngredient'
                    }
                  }
                ]
              }
            ]
          },
          __typename: "Session"
        }
      ],
      __typename: "PaginatedSession"
    }
  }
};

export function mockUseGetSessions(page = 1, limit = 7) {
  const allSessions = mockSessions.data.sessions.paginated;
  const totalItems = allSessions.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedSessions = allSessions.slice(startIndex, endIndex);

  console.log('lmiit', limit);
  return {
    loading: false,
    sessions: paginatedSessions,
    pagination: {
      totalPages,
      currentPage: page,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
    },
    refetch: () => Promise.resolve({
      data: {
        sessions: {
          paginated: paginatedSessions,
          page,
          limit,
          nextPage: page < totalPages ? page + 1 : null,
          prevPage: page > 1 ? page - 1 : null,
          totalPages,
          currentPage: page,
          __typename: "PaginatedSession"
        }
      }
    })
  };
}