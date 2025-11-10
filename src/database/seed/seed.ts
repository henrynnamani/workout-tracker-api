import { Exercise } from '@/module/exercises/model/exercise.entity';
import { ExerciseCategory } from '@/module/exercises/model/exercise.entity';
import { datasource } from '../datasource';
import { faker } from '@faker-js/faker';

export async function seed() {
  const appDatasource = await datasource.initialize();

  console.log('🌱 Database connected, starting faker seed...');

  const exerciseRepository = appDatasource.getRepository(Exercise);

  for (let i = 0; i < 20; ++i) {
    const exercise = exerciseRepository.create({
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      category: faker.helpers.arrayElement([
        ExerciseCategory.STRENGTH,
        ExerciseCategory.CARDIO,
        ExerciseCategory.FLEXIBILITY,
        ExerciseCategory.BALANCE,
      ]),
    });

    await exerciseRepository.save(exercise);
  }

  console.log('✅ 20 exercises seeded successfully!');

  await appDatasource.destroy();

  console.log('🌱 Database connection closed.');
}

seed().catch((err) => {
  console.error('❌ Error during seeding:', err);
});
