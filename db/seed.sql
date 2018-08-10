drop table if exists playlists;

create table playlists
(
    id serial primary key,
    name text
);

insert into playlists
(name)
values
('Dope jam'),
('smooth jam'),
('rasberry jam'),
('happy jam'),
('sad jam'),
('space jam');