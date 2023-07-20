INSERT INTO users (is_admin, first_name, last_name, email, password)
VALUES ('true','Cheech', 'AndChong', 'gethistayhi@email.com', 'password'),
       ('true','Freddie', 'Mercury', 'justkilledaman@email.com', 'password'),
       ('true','Trixie', 'Mattel', 'dragisnotacrime@email.com', 'password'),
       ('true','Henry', 'Cavill', 'geraltofrivia@email.com', 'password');



INSERT INTO courses (
    title, course_code, credit_hours, tuition, description, teacher_id, capacity, enrolled, days_of_week, start_time, end_time, room_number
)
VALUES (
    'Rolling your own', 'MJ-420', 3, 300.00, 'Apple beans bear biscuit bonbon candy caramels carrot chups claw cream danish donut drag. Apple applicake bar beans bear biscuit bonbon brownie', (SELECT id FROM users WHERE id = 1), 30, 0, 'MTWRF', '09:00:00', '12:00:00', 'FUN-247'
), (
    'Vapes vs Smoke', 'MJ-202', 3, 300.00, 'Apple beans bear biscuit bonbon candy caramels carrot chups claw cream danish donut drag. Apple applicake bar beans bear biscuit bonbon brownie', (SELECT id FROM users WHERE id = 1), 30, 0, 'MTW', '08:00:00', '09:00:00', 'FUN-247'
), (
    'Strain Identification', 'MJ-303', 3, 300.00, 'Apple beans bear biscuit bonbon candy caramels carrot chups claw cream danish donut drag. Apple applicake bar beans bear biscuit bonbon brownie', (SELECT id FROM users WHERE id = 1), 30, 0, 'TR', '12:00:00', '14:00:00', 'FUN-247'
), (
    'Indoor Growing', 'MJ-404', 3, 300.00, 'Apple beans bear biscuit bonbon candy caramels carrot chups claw cream danish donut drag. Apple applicake bar beans bear biscuit bonbon brownie', (SELECT id FROM users WHERE id = 1), 30, 0, 'WF', '12:00:00', '14:00:00', 'FUN-247'
), (
    'Music Legends', 'MS-101', 3, 300.00, 'Abba ac/dc aerosmith ahmet ertegun al green alan freed alice cooper allen toussaint aretha franklin art rupe barry mann and cynthia weil beastie boys', (SELECT id FROM users WHERE id = 2), 30, 0, 'RF', '15:00:00', '17:00:00', 'MUS-234'
), (
    'Album Recording', 'MS-201', 3, 300.00, 'Abba ac/dc aerosmith ahmet ertegun al green alan freed alice cooper allen toussaint aretha franklin art rupe barry mann and cynthia weil beastie boys', (SELECT id FROM users WHERE id = 2), 30, 0, 'W', '11:00:00', '14:00:00', 'MUS-235'
), (
    'Groupie Wrangeling', 'MS-303', 3, 300.00, 'Abba ac/dc aerosmith ahmet ertegun al green alan freed alice cooper allen toussaint aretha franklin art rupe barry mann and cynthia weil beastie boys', (SELECT id FROM users WHERE id = 2), 30, 0, 'F', '21:00:00', '23:00:00', 'MUS-236'
), (
    'Becoming a Rockstar', 'MS-404', 3, 300.00, 'Abba ac/dc aerosmith ahmet ertegun al green alan freed alice cooper allen toussaint aretha franklin art rupe barry mann and cynthia weil beastie boys', (SELECT id FROM users WHERE id = 2), 30, 0, 'WF', '11:00:00', '13:00:00', 'MUS-237'
), (
    'Tucking for Beginners', 'DR-101', 3, 300.00, 'Dirty sanchez el torro loco flaming liquid cocaine blaster hot minty kiss lychee martini belgian waffle gods alabama slammer the real slippery nipple', (SELECT id FROM users WHERE id = 3), 30, 0, 'M', '08:00:00', '09:00:00', 'DRA-105'
), (
    'Padding and Body', 'DR-202', 3, 300.00, 'Dirty sanchez el torro loco flaming liquid cocaine blaster hot minty kiss lychee martini belgian waffle gods alabama slammer the real slippery nipple', (SELECT id FROM users WHERE id = 3), 30, 0, 'MWF', '09:00:00', '11:00:00', 'DRA-105'
), (
    'Face and Hair', 'DR-303', 3, 300.00, 'Dirty sanchez el torro loco flaming liquid cocaine blaster hot minty kiss lychee martini belgian waffle gods alabama slammer the real slippery nipple', (SELECT id FROM users WHERE id = 3), 30, 0, 'TR', '09:00:00', '11:00:00', 'DRA-105'
), (
    'Reading and Throwing Shade', 'DR-404', 3, 300.00, 'Dirty sanchez el torro loco flaming liquid cocaine blaster hot minty kiss lychee martini belgian waffle gods alabama slammer the real slippery nipple', (SELECT id FROM users WHERE id = 3), 30, 0, 'MTWRF', '13:00:00', '15:00:00', 'DRA-105'
), (
    'Hunting Monsters', 'HC-101', 3, 300.00, 'Ahriman angra mainyu barbatos belial empusa furcas imp incubus jinn lamashtu lilin merihem murmur rumyal valefar. Aamon ahriman amdusias amy', (SELECT id FROM users WHERE id = 4), 30, 0, 'MTW', '19:00:00', '22:00:00', 'OUT-200'
), (
    'Being Thiccc', 'HC-202', 3, 300.00, 'Ahriman angra mainyu barbatos belial empusa furcas imp incubus jinn lamashtu lilin merihem murmur rumyal valefar. Aamon ahriman amdusias amy', (SELECT id FROM users WHERE id = 4), 30, 0, 'MWF', '8:00', '11:00', 'OUT-201'
), (
    'How to Exude BDE', 'HC-303', 3, 300.00, 'Ahriman angra mainyu barbatos belial empusa furcas imp incubus jinn lamashtu lilin merihem murmur rumyal valefar. Aamon ahriman amdusias amy', (SELECT id FROM users WHERE id = 4), 30, 0, 'TR', '8:00', '12:00', 'OUT-202'
), (
    'Reach Human Perfection', 'HC-404', 3, 300.00, 'Ahriman angra mainyu barbatos belial empusa furcas imp incubus jinn lamashtu lilin merihem murmur rumyal valefar. Aamon ahriman amdusias amy', (SELECT id FROM users WHERE id = 4), 30, 0, 'WRF', '13:00', '17:00', 'OUT-203'
);

SELECT * FROM courses;
