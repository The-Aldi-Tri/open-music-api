/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  // Create albums table
  pgm.createTable('albums', {
    id: { type: 'text', primaryKey: true },
    name: { type: 'text', notNull: true },
    year: { type: 'integer', notNull: true },
    created_at: { type: 'bigint', notNull: true },
    updated_at: { type: 'bigint', notNull: true },
  });

  // Create songs table
  pgm.createTable('songs', {
    id: { type: 'text', primaryKey: true },
    title: { type: 'text', notNull: true },
    year: { type: 'integer', notNull: true },
    genre: { type: 'text', notNull: true },
    performer: { type: 'text', notNull: true },
    duration: { type: 'integer' },
    album_id: { type: 'text', references: 'albums(id)' }, // Foreign key reference to albums table
    created_at: { type: 'bigint', notNull: true },
    updated_at: { type: 'bigint', notNull: true },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  // Drop songs table first to avoid foreign key constraint issues
  pgm.dropTable('songs');

  // Drop albums table
  pgm.dropTable('albums');
};
