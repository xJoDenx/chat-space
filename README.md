# DB設計

  ## usersテーブル

  |Column|Type|Options|
  |------|----|-------|
  |nickname|string|null: false|
  |e-mail|string|nul: false, unique: true|
  |password|string|nul: false|

  ### Association
  - has_many :groups_users
  - has_many :groups, through: :groups_users
  - has_many :comments

  ## groupsテーブル

  |Column|Type|Options|
  |------|----|-------|
  |name|string|null: false|
  |user_id|integer|null: false, foreign_key: true|

  ### Association
  - has_many :groups_users
  - has_many :users, through: :groups_users
  - has_many :comments

  ##commentsテーブル

  |Column|Type|Options|
  |------|----|-------|
  |text|text|null: false|
  |user_id|integer|null: false, foreign_key: true|
  |group_id|integer|null: false, foreign_key: true|

  ### Association
  - belongs_to :user
  - belongs_to :group

  ## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

