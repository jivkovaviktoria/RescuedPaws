using RescuedPaws.Core.Models.Administration.Responses.AnimalTypes;
using RescuedPaws.Core.Services.Administration;
using RescuedPaws.Data.Entities;
using RescuedPaws.UnitTests.Randomizers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.UnitTests.Services
{
    public class AnimalTypesServiceUnitTests : BaseTest
    {
        private readonly AnimalTypeRandomizer _animalTypeRandomizer;
        private readonly AnimalTypesService _animalTypesService;

        public AnimalTypesServiceUnitTests()
        {
            _animalTypeRandomizer = new AnimalTypeRandomizer();
            _animalTypesService = new AnimalTypesService(this.DbContext);
        }

        [Fact]
        public async Task GetAnimalTypes_ReturnsAllTypes()
        {
            List<AnimalType> types = new();
            for (int i = 0; i < 3; i++) types.Add(_animalTypeRandomizer.PrepareRandomValue());

            await this.DbContext.AnimalTypes.AddRangeAsync(types);
            await this.DbContext.SaveChangesAsync();

            var result = await _animalTypesService.GetAnimalTypes();

            Assert.Equal(3, result.Count);
            foreach (var type in types) Assert.Contains(result, x => x.Name == type.Name);
        }

        [Fact]
        public async Task GetAnimalType_ReturnsType_WhenIdIsValid()
        {
            var type = _animalTypeRandomizer.PrepareRandomValue();
            await this.DbContext.AnimalTypes.AddAsync(type);
            await this.DbContext.SaveChangesAsync();

            var result = await _animalTypesService.GetAnimalType(type.Id);

            Assert.NotNull(result);
            Assert.Equal(type.Name, result.Name);
        }

        [Fact]
        public async Task GetAnimalType_ReturnsNull_WhenIdIsInvalid()
        {
            var result = await _animalTypesService.GetAnimalType(Guid.NewGuid());
            Assert.Null(result);
        }

        [Fact]
        public async Task AddOrUpdateAnimalType_AddsNewType_WhenIdIsNull()
        {
            var model = new AnimalTypeFormModel { Name = "Reptile" };

            var result = await _animalTypesService.AddOrUpdateAnimalType(model);

            Assert.NotNull(result);
            Assert.NotEqual(Guid.Empty, result.Id);
            Assert.Equal("Reptile", result.Name);
        }

        [Fact]
        public async Task AddOrUpdateAnimalType_UpdatesExistingType_WhenIdIsNotNull()
        {
            var existingType = _animalTypeRandomizer.PrepareRandomValue();
            await this.DbContext.AnimalTypes.AddAsync(existingType);
            await this.DbContext.SaveChangesAsync();

            var model = new AnimalTypeFormModel { Id = existingType.Id, Name = "Amphibian" };

            var result = await _animalTypesService.AddOrUpdateAnimalType(model);

            Assert.Equal("Amphibian", result.Name);
        }

        [Fact]
        public async Task DeleteAnimalType_SoftDeletesType_ReturnsTrue_WhenTypeExists()
        {
            var animalType = _animalTypeRandomizer.PrepareRandomValue();

            await this.DbContext.AnimalTypes.AddAsync(animalType);
            await this.DbContext.SaveChangesAsync();

            var result = await _animalTypesService.DeleteAnimalType(animalType.Id);

            Assert.True(result);
            var updatedAnimalType = await this.DbContext.AnimalTypes.FindAsync(animalType.Id);
            Assert.False(updatedAnimalType?.IsActive);
        }
    }
}
