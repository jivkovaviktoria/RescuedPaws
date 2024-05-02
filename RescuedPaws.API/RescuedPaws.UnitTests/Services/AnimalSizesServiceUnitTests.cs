using RescuedPaws.Data.Entities;
using RescuedPaws.Core.Services.Administration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RescuedPaws.Core.Models.Administration.Responses.AnimalSize;
using RescuedPaws.UnitTests.Randomizers;
using System.Diagnostics;

namespace RescuedPaws.UnitTests.Services
{
    /// <summary>
    /// Tests for the AnimalSizesService.
    /// </summary>
    public class AnimalSizesServiceUnitTests : BaseTest
    {
        private readonly AnimalSizeRandomizer _animalSizeRandomizer;
        private readonly AnimalSizesService _animalSizesService;

        public AnimalSizesServiceUnitTests()
        {
            _animalSizeRandomizer = new AnimalSizeRandomizer();
            _animalSizesService = new AnimalSizesService(this.DbContext);
        }

        /// <summary>
        /// Test that the method returns all active animal sizes from the database.
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task GetAnimalSizes_ReturnsAllSizes()
        {
            List<AnimalSize> sizes = new();
            for (int i = 0; i < 3; i++) sizes.Add(this._animalSizeRandomizer.PrepareRandomValue());

            await this.DbContext.AnimalSizes.AddRangeAsync(sizes);
            await this.DbContext.SaveChangesAsync();

            var result = await this._animalSizesService.GetAnimalSizes();

            Assert.Equal(3, result.Count);
            foreach (var size in sizes) Assert.Contains(result, x => x.Name == size.Name);
        }

        /// <summary>
        /// Test retrieving a single animal size by ID.
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task GetAnimalSize_ReturnsSize_WhenIdIsValid()
        {
            var size = this._animalSizeRandomizer.PrepareRandomValue();
            await this.DbContext.AnimalSizes.AddAsync(size);
            await this.DbContext.SaveChangesAsync();

            var result = await this._animalSizesService.GetAnimalSize(size.Id);

            Assert.NotNull(result);
            Assert.Equal(size.Name, result.Name);
        }

        /// <summary>
        /// Test that the method returns null when the ID is invalid.
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task GetAnimalSize_ReturnsNull_WhenIdIsInvalid()
        {
            var result = await this._animalSizesService.GetAnimalSize(Guid.NewGuid());
            Assert.Null(result);
        }

        /// <summary>
        /// Test adding a new animal size to the database.
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task AddOrUpdateAnimalSize_AddsNewSize_WhenIdIsNull()
        {
            var model = new AnimalSizeFormModel { Name = "Tiny", };

            var result = await this._animalSizesService.AddOrUpdateAnimalSize(model);

            Assert.NotNull(result);
            Assert.NotEqual(Guid.Empty, result.Id);
            Assert.Equal("Tiny", result.Name);
        }

        /// <summary>
        /// Test updating an existing animal size in the database.
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task AddOrUpdateAnimalSize_UpdatesExistingSize_WhenIdIsNotNull()
        {
            var existingSize = this._animalSizeRandomizer.PrepareRandomValue();
            await this.DbContext.AnimalSizes.AddAsync(existingSize);
            await this.DbContext.SaveChangesAsync();

            var model = new AnimalSizeFormModel { Id = existingSize.Id, Name = "Super Huge" };

            var result = await this._animalSizesService.AddOrUpdateAnimalSize(model);

            Assert.Equal("Super Huge", result.Name);
        }

        /// <summary>
        /// Test that the method returns false when the ID is invalid.
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task DeleteAnimalSize_SoftDeletesSize_ReturnsTrue_WhenSizeExists()
        {
            var animalSize = this._animalSizeRandomizer.PrepareRandomValue();

            await this.DbContext.AnimalSizes.AddAsync(animalSize);
            await this.DbContext.SaveChangesAsync();

            var result = await this._animalSizesService.DeleteAnimalSize(animalSize.Id);

            Assert.True(result);
            var updatedAnimalSize = await this.DbContext.AnimalSizes.FindAsync(animalSize.Id);
            Assert.False(updatedAnimalSize?.IsActive);
        }

        /// <summary>
        /// Test that the method returns false when the ID is invalid.
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task DeleteAnimalSize_ReturnsFalse_WhenSizeDoesNotExist()
        {
            var nonExistentId = Guid.NewGuid();

            var result = await this._animalSizesService.DeleteAnimalSize(nonExistentId);

            Assert.False(result);
        }
    }
}
