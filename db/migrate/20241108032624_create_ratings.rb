class CreateRatings < ActiveRecord::Migration[7.1]
  def change
    create_table :ratings do |t|
      t.string :category
      t.integer :rating
      t.datetime :time

      t.timestamps
    end
  end
end
