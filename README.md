tugas:

1 buat tabel users:
- id: INTEGER
- email: STRING
- password: STRING

2 buat tabel roles
- id: INTEGER
- name: STRING
- user id -> FK tabel users : INTEGER reference ke users

3 buat tabel dorms
- id: INTEGER
- name: STRING
- address: TEXT
- owner: STRING
- facilities: JSONB