"use client";
import{useState,useMemo}from"react";
import{BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer,PieChart,Pie,Cell,CartesianGrid}from"recharts";

const RAW=[["Somalia Road Infrastructure Programme - Additional Financing - (HoA - ",2,16,0,77.1,0.0,"2025-12-10",""],["Ethiopia - South Sudan-Ethiopia-Djibouti: Transport Corridor Project- ",2,16,0,188.4,0.0,"2025-12-03","ET"],["South Sudan-Ethiopia-Djibouti: Transport Corridor Project- Phase II",2,16,0,3.4,0.0,"2025-12-03","SS"],["Djibouti - South Sudan - Ethiopia-Djibouti Transport Corridor Project ",2,16,0,31.4,0.0,"2025-12-03","DJ"],["Multinational - South Sudan - Uganda Power Interconnection Project",1,16,1,2.0,0.6,"2024-12-13",""],["South Sudan - Power Interconnection Project between South Sudan and Ug",2,16,1,85.3,0.0,"2024-12-13","SS"],["Uganda - Power Interconnection Project between South Sudan and Uganda",2,16,1,124.6,0.0,"2024-12-13","UG"],["Madagascar - Beira Port Corridor Development and Trade Facilitation Pr",2,16,0,169.6,0.0,"2024-12-11","MG"],["Mali - Community Road Interconnection and Transport Facilitation Progr",2,16,0,78.8,0.0,"2024-11-29","ML"],["Burkina Faso - Community Road Interconnection and Transport Facilitati",2,16,0,96.1,0.0,"2024-11-29","BF"],["Senegal - Labe-Mali (City) - Kedougou - Fongolembi Inter-State Road De",2,16,0,41.4,0.0,"2024-11-27","SN"],["Guinea - Labe-Mali (City) - Kedougou - Fongolembi Inter-State Road Dev",2,16,0,39.6,0.0,"2024-11-27","GN"],["Comoros - Maritime Corridor Development and Regional Trade Facilitati",1,16,0,147.8,6.4,"2024-07-19","KM"],["Multinational - Desert To Power Regional Technical Assistance Project ",1,16,1,6.3,0.3,"2023-12-15",""],["Multinational - Desert To Power Regional Technical Assistance Project ",2,16,1,3.2,0.0,"2023-12-15",""],["Liberia - Mano River Union Road Development and Transport Facilitation",1,16,0,39.8,0.2,"2023-12-14","LR"],["Sierra Leone - The Mano River Union Road Development and Transport Fac",1,16,0,39.9,0.4,"2023-12-14","SL"],["Mauritania - Desert to Power Initiative - 225 KV Mauritania-Mali Powe",1,16,1,271.1,1.6,"2023-12-14","MR"],["Mali - Desert to Power Initiative - 225 KV Mauritania-Mali Electrical ",2,16,1,44.7,0.0,"2023-12-14","ML"],["Multinational - Eastern Africa Power Pool (EAPP) Institutional Capacit",1,16,1,5.4,1.2,"2023-12-11",""],["Tanzania - Tanzania / Burundi / DR Congo joint standard gauge railway ",1,16,0,786.8,41.7,"2023-12-08",""],["Burundi - Tanzania-Burundi Standard Gauge Railways SGR Phase II",2,16,0,99.3,0.0,"2023-12-08","BI"],["Tanzania - Tanzania/Burundi/DR Congo joint standard gauge railway proj",2,16,0,191.2,0.0,"2023-12-08",""],["Cameroon - Regional Transport and Trade Facilitation Project on the Ca",2,16,0,80.0,0.0,"2023-11-29","CM"],["Djibouti - Nagad-Loyada/Lowyaddo-Borama Road Phase 1 Upgrading Project",1,15,0,28.5,0.0,"2023-03-29","DJ"],["Somalia - Nagad-Loyada/Lowyaddo-Borama Road Phase 1 Upgrading Project",1,15,0,44.2,0.1,"2023-03-29","SO"],["Kenya - Kenya/South Sudan Road Corridor Lesseru-Kitale and Morpus - L",2,15,0,212.7,0.0,"2022-12-16","KE"],["Multinational - Horn of Africa Digital Market Integration (HDMI) Proje",1,15,2,8.2,1.0,"2022-12-13",""],["Burundi - Cross Border Roads Upgrading Project Phase I",1,15,0,3.3,0.3,"2022-12-01","BI"],["Rwanda - Cross Border Roads Upgrading Project Phase I",1,15,0,72.2,9.4,"2022-12-01","RW"],["Uganda - EAC Railway Rehabilitation Support Project - Refurbishment o",1,15,0,296.7,1.6,"2022-11-30","UG"],["Democratic Republic of Congo - DRC - Angola Road Development Project",1,15,0,168.6,24.0,"2022-11-23",""],["Senegal - Dakar Road Corridor Improvement Project - Phase 1",1,15,0,32.9,5.9,"2022-11-09","SN"],["Multinational - Bissau - Dakar Road Corridor Improvement Project Pha",2,15,0,60.8,0.0,"2022-11-09",""],["Malawi - SADC Sub-Regional Transport and Trade Facilitation Project",1,15,0,63.3,15.1,"2022-10-26","MW"],["Mozambique - SADC Sub-Regional Transport and Trade Facilitation Projec",1,15,0,97.8,28.9,"2022-10-26","MZ"],["Guinea - Addendum Guinea-Mano River Union Road Development",2,15,0,7.9,0.0,"2022-10-17","GN"],["Multinational - Upstream project for digital market development in Afr",1,15,2,10.4,0.2,"2022-09-15",""],["Multinational - Regional Harmonization of Regulatory Framework",1,15,1,1.8,0.6,"2022-06-24",""],["Multinational - Desert-to-Power Initiative East-Africa Regional Energy",1,15,1,5.4,0.6,"2022-03-28",""],["Sierra Leone - Mano River Union Road Development Phase II",1,15,0,34.2,18.6,"2022-03-23","SL"],["Liberia - Mano River Union Road Development and Transport Facilitation",1,15,0,51.8,0.3,"2022-03-23","LR"],["Multinational - Institutional Support for Digital Payments and e-Comme",1,15,2,1.6,0.8,"2021-12-14",""],["Madagascar - Beira Port: Corridor Development and Trade Facilitation P",1,15,0,205.9,17.3,"2021-11-24","MG"],["Multinational - Continental Power System Master Plan Project (CMP)",1,15,1,3.0,2.4,"2021-11-17",""],["Kenya - Horn of Africa Isiolo Mandera Corridor El Wak Rhamu Road Upgr",1,15,0,214.4,8.6,"2021-11-17","KE"],["Central African Republic - Pointe-Noire-Brazzaville-Bangui-Ndjamena",1,15,0,369.2,56.7,"2021-11-10","CF"],["Chad - Trans-Saharan Highway Project (TSH) - Supplementary Grant",1,15,0,17.1,0.1,"2021-10-22","TD"],["Multinational - Regional Project Acceleration Unit",1,15,1,3.1,0.9,"2021-10-06",""],["Multinational - ECCAS: Support Project Development Institutional Capa",1,15,1,7.1,0.6,"2021-09-30",""],["Multinational - Regional Harmonization Regulatory Frameworks IGAD",1,15,1,1.6,1.4,"2021-07-15",""],["Multinational - SADC: Regional Harmonization Regulatory Frameworks",1,15,1,1.0,0.4,"2021-07-15",""],["Ethiopia - Ethiopia Djibouti Second Power Interconnection Phase II",1,15,1,71.4,9.9,"2021-07-07",""],["Djibouti - Ethiopia Djibouti Second Power Interconnection Phase II",1,15,1,14.2,1.5,"2021-07-07","DJ"],["Multinational - Desert to Power West Africa Regional Energy Phase I",1,15,1,1.9,1.3,"2021-07-01",""],["Multinational - Desert to Power West Africa Regional Energy Phase II",1,15,1,4.0,0.2,"2021-07-01",""],["Multinational - Study Abidjan-Lagos Corridor Highway Development",1,14,0,17.6,5.0,"2020-04-17",""],["Multinational - Malawi/Zambia Nacala Road Corridor Phase IV",1,14,0,12.5,5.1,"2020-02-28",""],["Multinational - Institutional Support African Civil Aviation",1,14,0,6.9,4.3,"2020-02-04",""],["Multinational DRC/CONGO - Access Roads to Ruzizi III",1,14,0,56.4,1.7,"2019-12-16",""],["Tanzania - Horohorolunga-Lunga-Malindi Road Project Phase I",1,14,0,193.1,47.2,"2019-12-12",""],["Kenya - Horohoro-Lunga-Malindi Road Project Phase I",1,14,0,261.5,110.3,"2019-12-12","KE"],["Burundi - Lake Tanganyika Transport Corridor Phase III",1,14,0,51.0,16.7,"2019-12-05","BI"],["Multinational - Mueda-Negomano Road Project Phase II",1,14,0,33.1,19.7,"2019-11-25",""],["Ethiopia - Feasibility Study Standard Gauge Railway",0,14,0,3.4,2.4,"2019-11-05","ET"],["Multinational - Capacity Building East African Power Pool",1,14,1,1.0,0.9,"2019-10-24",""],["Ethiopia - Ethiopia-Djibouti Transport Corridor Phase I",1,14,0,244.6,59.7,"2019-07-19","ET"],["Djibouti - Ethiopia-Djibouti Transport Corridor Phase I",1,14,0,5.2,0.2,"2019-07-19","DJ"],["Multinational - Temane Transmission Project (TTP)",1,14,1,32.3,14.1,"2019-07-19",""],["Malawi - Nacala road corridor Phase V",1,14,0,62.4,13.2,"2019-06-19","MW"],["Multinational - Burundi-Rwanda Power Grid Interconnection",1,14,1,28.0,20.0,"2018-12-14",""],["Madagascar - Indian Ocean Corridors and Trade Facilitation",1,14,0,133.4,111.1,"2018-11-27","MG"],["Multinational - Rumonge-Gitaza Kabingo-Kasulu-Manyovu Tanzania",1,14,0,257.9,157.1,"2018-11-22",""],["Multinational - Rumonge-Gitaza Kabingo-Kasulu-Manyovu Burundi",1,14,0,65.7,38.4,"2018-11-22",""],["Guinea - Boke-Quebo Road Improvement Phase 1",1,14,0,60.1,13.9,"2018-10-10","GN"],["Guinea Bissau - Boke-Quebo Road Improvement Phase 1",1,14,0,33.3,0.3,"2018-10-10",""],["Multinational - Mano River Union Road Development Phase I",1,14,0,64.9,57.2,"2018-09-19",""],["Multinational - Cameroon Chad Power Interconnection Chad",1,14,1,39.8,0.3,"2017-12-15",""],["Multinational - Nigeria-Niger-Benin-BF Power Interconnection I",1,14,1,105.8,43.8,"2017-12-15",""],["Multinational - Nigeria-Niger-Benin-BF Power Interconnection II",1,14,1,72.3,44.2,"2017-12-15",""],["Multinational - Cameroon Chad Power Interconnection Cameroon",1,14,1,261.5,2.1,"2017-12-15",""],["Mali - 225KV Guinea-Mali Electricity Interconnection",1,14,1,46.1,28.5,"2017-12-13","ML"],["Guinea - 225KV Guinea-Mali Electricity Interconnection",1,14,1,75.3,54.5,"2017-12-13","GN"],["Multinational - Lake Chad Basin Road Network Integration I",1,14,0,47.9,24.2,"2017-12-11",""],["Multinational - Lake Chad Basin Road Network Integration II",1,14,0,86.8,40.0,"2017-12-11",""],["Multinational - Feasibility Cameroon-Chad Extension I",1,14,0,2.9,2.6,"2017-11-28",""],["Multinational - Feasibility Cameroon-Chad Extension II",1,14,0,2.9,2.6,"2017-11-28",""],["Multinational - Community Road CU2A Gounghin-Fada-Piega",1,14,0,211.5,28.2,"2017-11-24",""],["Guinea - Coyah-Farmoreah-SL Border Road Reconstruction",1,14,0,89.6,69.9,"2017-10-25",""],["Uganda - Kapchorwa-Suam-Kitale Eldoret Bypass Roads",0,13,0,113.6,90.0,"2017-03-29","UG"],["Kenya - Kapchorwa-Suam-Kitale Eldoret Bypass Roads",0,13,0,149.1,98.1,"2017-03-29","KE"],["Benin - Lome-Cotonou Road Rehabilitation Phase 2",1,13,0,6.9,1.3,"2016-12-16","BJ"],["Togo - Lome-Cotonou Road Rehabilitation Phase 2",1,13,0,70.6,44.7,"2016-12-16","TG"],["Multinational - Trans-Sahara Optical Fibre Backbone",1,13,2,53.4,35.2,"2016-12-09",""],["Senegal - Rosso Bridge Construction Project",1,13,0,23.2,10.8,"2016-12-09","SN"],["Mauritania - Rosso Bridge Construction Project",1,13,0,49.5,14.7,"2016-12-09","MR"],["Multinational - NELSAP Electric Grids Interconnection",0,13,1,1.6,1.4,"2016-11-15",""],["Multinational - Lake Victoria Maritime Transport I",1,13,2,17.2,12.8,"2016-10-24",""],["Multinational - Lake Victoria Maritime Transport II",0,13,2,7.6,4.8,"2016-10-24",""],["Multinational - Lake Victoria Maritime Transport III",0,13,2,2.2,0.0,"2016-10-24",""],["Togo - Abidjan-Lagos Corridor Study",1,13,0,1.4,1.4,"2016-09-21","TG"],["Benin - Abidjan-Lagos Corridor Study",1,13,0,1.4,1.4,"2016-09-21","BJ"],["Multinational - Abidjan-Lagos Highway Corridor Study Main",1,13,0,16.4,10.0,"2016-09-21",""],["Multinational - Abidjan-Lagos Corridor Study Phase I",0,13,0,1.4,1.1,"2016-09-21",""],["Nigeria - Abidjan-Lagos Corridor Study",0,13,0,1.4,1.4,"2016-09-21","NG"],["Multinational - 50M African Women Speak Platform I",0,13,2,5.3,5.3,"2016-07-15",""],["Multinational - 50M African Women Speak Platform II",0,13,2,3.4,2.2,"2016-07-15",""],["Multinational - 50M African Women Speak Platform III",0,13,2,3.2,2.4,"2016-07-15",""],["DRC - NELSAP Electric Grids Interconnection",0,13,1,11.0,3.9,"2016-07-05",""],["Rwanda - Busega-Mpigi Kagitumba-Kayonza-Rusumo Roads",1,13,0,129.0,111.0,"2016-06-22","RW"],["Uganda - Busega-Mpigi Kagitumba-Kayonza-Rusumo Roads",1,13,0,186.1,136.7,"2016-06-22","UG"],["Multinational - Ruzizi III Hydropower Plant Main",1,13,1,82.4,1.6,"2015-12-16",""],["Multinational - Ruzizi III Hydropower TA I",1,13,1,2.1,0.2,"2015-12-16",""],["Multinational - Ruzizi III Hydropower TA II",1,13,1,2.4,0.2,"2015-12-16",""],["Multinational - Ruzizi III Hydropower Rwanda",2,13,1,22.5,0.0,"2015-12-16",""],["Multinational - Ruzizi III Hydropower Burundi",1,13,1,26.6,0.0,"2015-12-16",""],["Mali - Road Development Bamako Corridor",1,13,0,116.1,96.9,"2015-11-26","ML"],["Cote dIvoire - Road Development Bamako Corridor",1,13,0,118.3,85.3,"2015-11-26",""],["Gambia - OMVG Energy Project Gambia",1,13,1,14.4,3.8,"2015-09-30","GM"],["Guinea - OMVG Energy Project Guinea",1,13,1,74.3,62.6,"2015-09-30","GN"],["Guinea Bissau - OMVG Energy Project GB",1,13,1,14.5,3.9,"2015-09-30",""],["Senegal - OMVG Energy Project Senegal",1,13,1,78.9,49.5,"2015-09-30","SN"],["Multinational - Air Transport Sectors West Africa I",1,13,0,4.3,1.8,"2015-07-06",""],["Multinational - Air Transport Sectors West Africa II",1,13,0,2.8,1.7,"2015-07-06",""],["Multinational - Air Transport Sectors West Africa III",1,13,0,4.1,0.1,"2015-07-06",""],["Guinea - MRU Road Programme Guinea",1,13,0,13.9,7.5,"2015-06-03","GN"],["Ivory Coast - MRU Road Programme CI",1,13,0,43.1,35.0,"2015-06-03",""],["Liberia - MRU Road Programme Liberia",1,13,0,34.7,30.1,"2015-06-03","LR"],["Multinational - African Network Centers Excellence Electricity",0,13,1,11.5,10.8,"2015-05-26",""],["Tanzania - Kenya-Tanzania Power Interconnection TZ",0,13,1,104.5,102.7,"2015-02-18",""],["Kenya - Kenya-Tanzania Power Interconnection KE",0,13,1,36.6,36.0,"2015-02-18","KE"],["Multinational - MRU Road Development Phase II Main",1,13,0,91.0,76.9,"2014-12-18",""],["Liberia - MRU Road Development Phase II LR",1,13,0,73.4,68.1,"2014-12-18","LR"],["Guinea - MRU Road Development Phase II GN",1,13,0,33.0,16.8,"2014-12-18","GN"],["Multinational - Kariba Dam Rehabilitation I",1,13,1,32.7,19.3,"2014-12-15",""],["Multinational - Kariba Dam Rehabilitation II",1,13,1,35.5,21.6,"2014-12-15",""],["Congo - Ndende-Dolisie Road Libreville-Brazzaville Corridor",0,12,0,198.7,40.1,"2013-12-18","CG"],["Mozambique - Enabling Large Scale Gas Power Technical",0,12,1,15.6,13.6,"2013-12-18","MZ"],["Multinational - Trans-Sahara Highway Niger",1,12,0,128.3,63.5,"2013-12-11",""],["Multinational - Trans-Sahara Highway Chad",1,12,0,139.9,39.3,"2013-12-11",""],["Malawi - Nacala Road Corridor Phase IV MW",0,12,0,65.8,59.4,"2013-12-03","MW"],["Zambia - Nacala Road Corridor Phase IV ZM",0,12,0,7.7,6.9,"2013-12-03","ZM"],["Rwanda - Regional Rusumo Falls Hydropower RW",0,12,1,35.7,30.3,"2013-11-27","RW"],["Tanzania - Regional Rusumo Falls Hydropower TZ",0,12,1,28.3,19.2,"2013-11-27",""],["Burundi - Regional Rusumo Falls Hydropower BI",0,12,1,45.6,36.9,"2013-11-21","BI"],["Multinational - INGA Site Development Electricity Access",1,12,1,70.9,10.7,"2013-11-20",""],["Guinea - CLSG Electricity Interconnection GN I",0,12,1,15.8,13.9,"2013-11-06","GN"],["Guinea - CLSG Electricity Interconnection GN II",0,12,1,1.2,1.1,"2013-11-06","GN"],["Sierra Leone - CLSG Electricity Interconnection SL I",0,12,1,1.1,1.0,"2013-11-06","SL"],["Sierra Leone - CLSG Electricity Interconnection SL II",0,12,1,38.4,29.5,"2013-11-06","SL"],["Cote dIvoire - CLSG Electricity Interconnection CI I",0,12,1,9.4,7.4,"2013-11-06","CI"],["Liberia - CLSG Electricity Interconnection LR I",0,12,1,27.6,25.8,"2013-11-06","LR"],["Sierra Leone - CLSG Electricity Interconnection SL III",0,12,1,20.1,17.4,"2013-11-06","SL"],["Multinational - CLSG Electricity Interconnection Main",0,12,1,1.1,1.0,"2013-11-06",""],["Guinea - CLSG Electricity Interconnection GN III",0,12,1,48.4,40.0,"2013-11-06","GN"],["Cote dIvoire - CLSG Electricity Interconnection CI II",0,12,1,44.6,34.9,"2013-11-06","CI"],["Liberia - CLSG Electricity Interconnection LR II",0,12,1,24.4,10.0,"2013-11-06","LR"],["Multinational - Cameroon-Chad Electricity Study I",0,12,1,1.6,1.5,"2013-10-07",""],["Multinational - Cameroon-Chad Electricity Study II",0,12,1,1.9,1.5,"2013-10-07",""],["Multinational - Arusha-Holili/Taveta-Voi Road I",0,12,0,114.3,94.8,"2013-04-16",""],["Multinational - Arusha-Holili/Taveta-Voi Road II",0,12,0,105.6,84.2,"2013-04-16",""],["Kenya - Ethiopia/Kenya Electricity Highway KE",0,12,1,201.2,98.8,"2012-09-19","KE"],["Ethiopia - Ethiopia/Kenya Electricity Highway ET",0,12,1,235.0,183.4,"2012-09-19","ET"],["Multinational - Boali Power Grids Interconnection Main",1,12,1,45.7,36.9,"2012-09-19",""],["DRC - Boali Power Grids Interconnection DRC",1,12,1,8.4,6.9,"2012-09-19",""],["CAR - Transport Facilitation Douala Corridor",0,12,0,6.3,6.2,"2012-07-02","CF"],["Togo - Lome-Cinkasse-Ouagadougou Road Rehabilitation",0,12,0,121.0,97.3,"2012-06-27","TG"],["Burkina Faso - Lome-Cinkasse-Ouagadougou Road Rehabilitation",0,12,0,159.2,136.7,"2012-06-27","BF"],["Rwanda - Mugina-Mabanda-Lake Nyanza Roads",0,12,0,76.3,61.8,"2012-06-27","RW"],["Burundi - Mugina-Mabanda-Lake Nyanza Roads",0,12,0,46.1,37.9,"2012-06-27","BI"],["Multinational - Trans-Gambia Corridor Phase I",0,12,0,116.0,104.4,"2011-12-16",""],["Zambia - Kazungula Bridge Project",0,12,0,94.8,70.2,"2011-12-07","ZM"],["Multinational - Mombasa-Nairobi-Addis Ababa Corridor I",0,12,0,167.1,141.6,"2011-11-30",""],["Multinational - Mombasa-Nairobi-Addis Ababa Corridor II",0,12,0,155.5,133.8,"2011-11-30",""],["Benin - Lome-Cotonou Road Rehabilitation Phase I",0,12,0,125.7,105.0,"2011-10-05","BJ"],["Multinational - Guinea-Mali Electricity Interconnection Study",0,12,1,3.9,3.4,"2011-01-12",""],["Multinational - Ouesso-Bangui-Ndjamena Road Study",0,11,0,25.9,8.3,"2010-12-01",""],["Multinational - Nacala Road Corridor Phase II",0,11,0,84.2,77.2,"2010-09-27",""],["Multinational - COMESA Institutional Support",0,11,0,9.0,5.6,"2010-09-15",""],["Multinational - Supplementary Loan Kenya Power",0,11,1,36.3,30.8,"2010-06-16",""],["Multinational - Dar Es Salaam-Isaka-Kigali Railway Study",0,11,0,12.9,6.4,"2009-11-17",""],["Multinational - Ketta-Djoum Road Brazzaville-Yaounde Corridor",0,11,0,322.7,173.7,"2009-09-25",""],["Multinational - Mombasa-Nairobi-Addis Ababa Corridor Phase I A",0,11,0,222.7,166.0,"2009-07-01",""],["Multinational - Mombasa-Nairobi-Addis Ababa Corridor Phase I B",0,11,0,159.6,125.8,"2009-07-01",""],["Multinational - Nacala Road Corridor Phase I Mozambique",1,11,0,288.3,149.6,"2009-06-24",""],["Multinational - Nacala Road Corridor Phase I Malawi",0,11,0,16.7,13.3,"2009-06-24",""],["Multinational - Nyamitanga-Ruhwa-Ntendezi-Mwityazo Road",0,11,0,151.4,149.5,"2008-12-16",""],["Multinational - Road-Rail Bridge Kinshasa-Brazzaville Study",0,11,0,15.6,6.9,"2008-12-03",""],["Multinational - NELSAP Electric Grids Main",0,11,1,4.5,3.8,"2008-11-27",""],["DRC - NELSAP Electric Grids DRC",0,11,1,40.8,23.5,"2008-11-27",""],["Multinational - NELSAP Electric Grids Rwanda",0,11,1,21.9,18.7,"2008-11-27",""],["Multinational - NELSAP Electric Grids Burundi",0,11,1,70.7,58.2,"2008-11-27",""],["Multinational - NELSAP Electric Grids Kenya",0,11,1,48.4,43.1,"2008-11-27",""],["Multinational Cameroon-Nigeria Transport Facilitation",1,11,0,655.7,82.3,"2008-11-25",""],["Multinational - Power Interconnection Supplementary Loan",0,11,1,21.8,7.0,"2008-10-08",""],["Multinational - Power Interconnection Grant",0,11,1,23.4,24.1,"2008-10-08",""],["Multinational - Inga Hydropower Site Development Study",0,11,1,16.5,14.4,"2008-04-30",""]];

const SN=["Completion","Ongoing","Approved"],SL=["Transport","Power","Communications"];
const G={g:"#00A86A",r:"#E53935",w:"#FF9800",b:"#1976D2",m:"#9E9E9E"};
const SC=["#1976D2","#FF9800","#00A86A"];

const P=RAW.map(r=>{const age=r[6]?(new Date("2026-03-14")-new Date(r[6]))/(365.25*864e5):0;const rate=r[4]>0?(r[5]/r[4])*100:0;return{t:r[0],s:SN[r[1]],cy:`ADF-${r[2]}`,cn:r[2],se:SL[r[3]],c:r[4],d:r[5],rate,ap:r[6],co:r[7],age}});

const fmt=n=>n>=1e3?`$${(n/1e3).toFixed(1)}B`:`$${Math.round(n)}M`;
const rateC=r=>r>70?G.g:r<20?G.r:r<40?G.w:"#333";

function SH({l,f,sort,set,a}){
  const act=sort.f===f;const ar=act?(sort.d==="a"?" \u25B2":" \u25BC"):" \u21C5";
  return <th onClick={()=>set(p=>({f,d:p.f===f&&p.d==="a"?"d":"a"}))} style={{padding:"7px 6px",textAlign:a||"left",cursor:"pointer",userSelect:"none",whiteSpace:"nowrap",fontSize:11,borderBottom:"2px solid #ddd",background:"#fafafa",position:"sticky",top:0,zIndex:1}}>{l}<span style={{fontSize:9,opacity:act?1:0.3,marginLeft:2}}>{ar}</span></th>;
}

function srt(list,sort){if(!sort.f)return list;return[...list].sort((a,b)=>{let va=a[sort.f],vb=b[sort.f];if(typeof va==="string"){va=va.toLowerCase();vb=(vb||"").toLowerCase();}if(va<vb)return sort.d==="a"?-1:1;if(va>vb)return sort.d==="a"?1:-1;return 0;});}

function KPI({l,v,sub,color=G.g}){return<div style={{background:"white",borderRadius:8,padding:"12px 16px",flex:1,minWidth:125,borderLeft:`4px solid ${color}`,boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}><div style={{fontSize:10,color:"#666",textTransform:"uppercase",letterSpacing:0.5}}>{l}</div><div style={{fontSize:20,fontWeight:700,color,marginTop:2}}>{v}</div>{sub&&<div style={{fontSize:10,color:"#999",marginTop:2}}>{sub}</div>}</div>;}

const KPIS=[
{tier:"Tier 1: Board / Deputies",desc:"Strategic \u2014 quarterly/annual reporting to 43 donor countries",items:[
{n:"ROE Disbursement Rate",f:"Total disbursed / Total committed",cur:"39.8%",tgt:">50%",src:"CGD: align with IDA benchmarks"},
{n:"Portfolio-at-Risk (PAR)",f:"At-risk count / Total ongoing",cur:"35%",tgt:"<15%",src:"Standard MDB portfolio metric"},
{n:"PAR by Value",f:"At-risk $ / Total ongoing $",cur:"49%",tgt:"<20%",src:"Value-weighted risk signal"},
{n:"Severely At-Risk Rate",f:"<10% disb after 3yr / Ongoing",cur:"18%",tgt:"<5%",src:"Escalation trigger for Steering Committee"},
{n:"Cycle Completion Rate",f:"Completed / Total per mature cycle",cur:"88% (ADF-12)",tgt:">90%",src:"RMF Level 3 indicator"},
{n:"Undisbursed Balance",f:"Total committed \u2212 disbursed",cur:"$8.6B",tgt:"Declining",src:"Capital efficiency for Market Borrowing"},
{n:"Disbursement at Close",f:"Avg disb rate at completion",cur:"76.7%",tgt:">85%",src:"Resource efficiency \u2014 23% returned"},
{n:"Approval-to-Signature",f:"Days from Board to country signature",cur:"94 days",tgt:"<90 days",src:"RMF Level 3 process efficiency"},
{n:"Gender Marker Coverage",f:"Tagged projects / Total per cycle",cur:"96% (ADF-16)",tgt:"100%",src:"ADF-17 Deputies requirement"},
{n:"Climate Tagging Rate",f:"Climate-tagged / Total per cycle",cur:"96% (ADF-16)",tgt:"100%",src:"Climate Action Window alignment"},
{n:"Concentration Index",f:"Top 3 projects as % of cycle",cur:"47% (ADF-16)",tgt:"<35%",src:"Portfolio diversification risk"},
{n:"Country Participation",f:"Unique countries in active ROE",cur:"29",tgt:"Growing",src:"Integration breadth metric"},
]},
{tier:"Tier 2: Management / RDRI",desc:"Monitoring \u2014 monthly/quarterly for Kategekwa & Steering Committee",items:[
{n:"Disbursement Velocity",f:"Disb rate / Years since approval",cur:"6.3%/yr (ADF-14)",tgt:"Improving trend",src:"Capital deployment speed"},
{n:"Pipeline Value",f:"Sum commitments of Approved status",cur:"$1,658M",tgt:"Track growth",src:"ADF-17 pipeline building"},
{n:"Pipeline Aging",f:"Avg days since approval (Approved)",cur:"486d (ADF-16 avg)",tgt:"<365 days",src:"Effectiveness lag tracking"},
{n:"Stalled Pipeline",f:"Approved projects waiting >365 days",cur:"4 projects",tgt:"0",src:"Intervention trigger"},
{n:"Regional Balance",f:"Commitments by REC region",cur:"Concentrated",tgt:"Balanced",src:"Equitable distribution across regions"},
{n:"Corridor Concentration",f:"Value aggregated by corridor",cur:"Not aggregated",tgt:"Build corridor mapping",src:"Portfolio diversification analysis"},
{n:"Country Disb Ranking",f:"Disbursement rate per country",cur:"0% to 80%",tgt:"Monitor outliers",src:"Country capacity flagging"},
{n:"Duration Accuracy",f:"Actual / Planned project duration",cur:"~2x overrun",tgt:"<1.3x",src:"Planning quality metric"},
]},
{tier:"Tier 3: Operations / Kon\u00e9",desc:"Operational \u2014 weekly/monthly project-level tracking",items:[
{n:"Early Warning Score",f:"Composite: disb + age + sector + country",cur:"To build with internal data",tgt:"Flag projects > threshold",src:"Proactive risk detection"},
{n:"Problem Project Count",f:"<10% disb after 3+ years",cur:"19 projects",tgt:"<10",src:"Steering Committee reporting"},
{n:"Risk Trend (QoQ)",f:"PAR change vs prior quarter",cur:"To track quarterly",tgt:"Improving",src:"Direction signal"},
{n:"Database Completeness",f:"Required fields populated / Total",cur:"~70% (public data)",tgt:">95%",src:"Data quality \u2014 your Day 1 audit"},
{n:"Reporting Timeliness",f:"TM reports on time / Total due",cur:"To track",tgt:">90%",src:"Process discipline"},
{n:"Meeting Frequency",f:"Steering Committee meetings held",cur:"Quarterly target",tgt:"Quarterly",src:"Governance compliance"},
{n:"Decision Implementation",f:"Actions completed / Assigned",cur:"To track",tgt:">80%",src:"Governance effectiveness"},
]},
{tier:"Tier 4: CGD / External",desc:"Results framework \u2014 annual/replenishment accountability",items:[
{n:"Cross-Border km Constructed",f:"Aggregate from project documents",cur:"Not aggregated",tgt:"Build Level 2 output DB",src:"CGD: outcome indicator needed"},
{n:"Baseline Infrastructure Stock",f:"Total existing cross-border infra",cur:"NOT TRACKED",tgt:"Reconstruct historically",src:"CGD: THE gap \u2014 no Level 1 baseline exists"},
{n:"Trade Volume on Corridors",f:"External data (WTO, customs)",cur:"Not linked",tgt:"Propose methodology",src:"CGD: outcome attribution"},
{n:"Energy Capacity Added (MW)",f:"From project completion reports",cur:"Not aggregated",tgt:"Build energy output DB",src:"CGD: Pillar 1 output indicator"},
{n:"Co-financing Leverage",f:"External $ mobilised per ROE $",cur:"Not calculated",tgt:"Calculate ratio",src:"Market Borrowing credibility"},
{n:"IDA Reform Alignment",f:"Baseline-outcome pairing rate",cur:"Weak pairing",tgt:"1:1 indicator pairs",src:"CGD: IDA reformed, ADF must follow"},
{n:"Spending-Indicator Match",f:"% indicators matching 83% Pillar 1",cur:"Disproportionate",tgt:"Proportional",src:"CGD: too many Pillar 2 indicators"},
]},
{tier:"Tier 5: Predictive",desc:"Advanced analytics \u2014 build after Month 3 once trust is established",items:[
{n:"Completion Probability",f:"Logistic regression on 69 completed",cur:"Model to build",tgt:"Score per project",src:"Proactive completion planning"},
{n:"Disbursement Gap Forecast",f:"Time-series on historical curves",cur:"Model to build",tgt:"Per cycle forecast",src:"Forward-looking risk signal"},
{n:"At-Risk Escalation Predictor",f:"Velocity trend + context",cur:"Model to build",tgt:"90-day warning",src:"Early intervention trigger"},
{n:"ROE Effectiveness Index",f:"Composite: disb + completion + align",cur:"Index to design",tgt:"One-number health signal",src:"Portfolio health composite"},
{n:"Connectivity Score",f:"km + countries + trade facilitation",cur:"Index to design",tgt:"Integration metric",src:"Cross-border impact measurement"},
{n:"Fragility-Adjusted Performance",f:"Scores adjusted for fragile context",cur:"Index to design",tgt:"Fair comparison",src:"Equitable performance assessment"},
]}];

export default function Dashboard(){
const[tab,setTab]=useState("overview");
const[search,setSearch]=useState("");
const[cycleF,setCycleF]=useState("all");
const[statusF,setStatusF]=useState("all");
const[sectorF,setSectorF]=useState("all");
const[sortP,setSortP]=useState({f:"c",d:"d"});
const[sortR,setSortR]=useState({f:"c",d:"d"});
const[aiQ,setAiQ]=useState("");
const[aiR,setAiR]=useState("");
const[aiL,setAiL]=useState(false);
const[kpiT,setKpiT]=useState(0);

const totalC=P.reduce((s,p)=>s+p.c,0);
const totalD=P.reduce((s,p)=>s+p.d,0);
const ongoing=P.filter(p=>p.s==="Ongoing");
const atRisk=ongoing.filter(p=>p.rate<20&&p.age>2);
const atRiskVal=atRisk.reduce((s,p)=>s+p.c,0);

const cycleData=useMemo(()=>{const cy={};P.forEach(p=>{if(!cy[p.cy])cy[p.cy]={name:p.cy,committed:0,disbursed:0,n:0,ongoing:0,atRisk:0};cy[p.cy].committed+=p.c;cy[p.cy].disbursed+=p.d;cy[p.cy].n++;if(p.s==="Ongoing"){cy[p.cy].ongoing++;if(p.rate<20&&p.age>2)cy[p.cy].atRisk++;}});return Object.values(cy).sort((a,b)=>a.name.localeCompare(b.name)).map(c=>({...c,rate:c.committed>0?(c.disbursed/c.committed*100):0,riskRate:c.ongoing>0?(c.atRisk/c.ongoing*100):0}));},[]);

const sectorData=useMemo(()=>{const s={};P.forEach(p=>{if(!s[p.se])s[p.se]={name:p.se,value:0};s[p.se].value+=p.c;});return Object.values(s);},[]);

const velocityData=useMemo(()=>cycleData.map(c=>{const cyc=ongoing.filter(p=>p.cy===c.name);if(!cyc.length)return null;const aa=cyc.reduce((s,p)=>s+p.age,0)/cyc.length;const ar=cyc.reduce((s,p)=>s+p.rate,0)/cyc.length;return{name:c.name,velocity:aa>0?+(ar/aa).toFixed(1):0,avgAge:+aa.toFixed(1),avgRate:+ar.toFixed(1)};}).filter(Boolean),[]);

const filteredP=useMemo(()=>{let fp=P;if(cycleF!=="all")fp=fp.filter(p=>p.cy===cycleF);if(statusF!=="all")fp=fp.filter(p=>p.s===statusF);if(sectorF!=="all")fp=fp.filter(p=>p.se===sectorF);if(search)fp=fp.filter(p=>p.t.toLowerCase().includes(search.toLowerCase())||p.co.toLowerCase().includes(search.toLowerCase()));return srt(fp,sortP);},[search,cycleF,statusF,sectorF,sortP]);

const sortedRisk=useMemo(()=>srt(atRisk,sortR),[sortR]);

const handleAI=async()=>{if(!aiQ.trim())return;setAiL(true);setAiR("");
try{const ctx=`ROE Portfolio: 197 projects, $${Math.round(totalC)}M committed, $${Math.round(totalD)}M disbursed, ${(totalD/totalC*100).toFixed(1)}% rate. Ongoing: ${ongoing.length}. At-risk: ${atRisk.length} ($${Math.round(atRiskVal)}M, ${(atRisk.length/ongoing.length*100).toFixed(0)}%). Sectors: Transport 111/$11,174M/38.1%, Power 76/$3,081M/45.4%, Comms 10/$112M/57.5%. Cycles: ${cycleData.map(c=>`${c.name}:${c.n}proj $${Math.round(c.committed)}M ${c.rate.toFixed(1)}%`).join('; ')}. ADF-15: 66% at-risk. Top at-risk: TZ/BI/DRC Railway $787M 5.3%; CM-NG $656M 12.5% 17yr; CAR Corridor $369M 15.4%. Close avg: 76.7%. Sig lag: 5.0mo(ADF-11)->3.1mo(ADF-16). Gender: 0%->96%. 29 countries. GN(10),KE(6),LR(6).`;
const res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:aiQ,context:ctx})});
const data=await res.json();if(data.error){setAiR(data.error);}else{setAiR(data.text||"No response received.");}}catch(e){setAiR(`Connection error: ${e.message}\n\nEnsure ANTHROPIC_API_KEY is set in Vercel Environment Variables.`);}setAiL(false);};

const tabs=[{id:"overview",l:"\u{1F4CA} Overview"},{id:"risk",l:"\u26A0\uFE0F Risk"},{id:"disbursement",l:"\u{1F4B0} Disbursement"},{id:"projects",l:"\u{1F4CB} Projects"},{id:"kpi",l:"\u{1F3AF} KPI Framework"},{id:"ai",l:"\u{1F916} AI Query"}];

return(<div style={{fontFamily:"system-ui,-apple-system,sans-serif",background:"#F8F9FA",minHeight:"100vh"}}>
{/* Header */}
<div style={{background:"linear-gradient(135deg,#004D40 0%,#00A86A 100%)",color:"white",padding:"18px 24px 14px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
<div><div style={{fontSize:10,textTransform:"uppercase",letterSpacing:1.5,opacity:0.8}}>AfDB Regional Operations Envelope</div>
<div style={{fontSize:20,fontWeight:700,marginTop:3}}>ROE Portfolio Intelligence Dashboard</div>
<div style={{fontSize:11,opacity:0.7,marginTop:3}}>197 Regional Operations | ADF-11 to ADF-16 | Transport + Power + Communications</div></div>
<div style={{textAlign:"right",fontSize:10,opacity:0.6,lineHeight:1.6}}><div>Public Data Analysis</div><div>O. Zinsou SENOU</div><div>March 2026</div></div>
</div></div>

{/* KPI Bar */}
<div style={{display:"flex",gap:8,padding:"12px 16px",flexWrap:"wrap"}}>
<KPI l="Committed" v={fmt(totalC)} sub={`${P.length} projects`}/>
<KPI l="Disbursed" v={fmt(totalD)} sub={`${(totalD/totalC*100).toFixed(1)}%`} color={G.b}/>
<KPI l="At-Risk" v={`${atRisk.length}`} sub={fmt(atRiskVal)} color={G.r}/>
<KPI l="PAR Rate" v={`${(atRisk.length/ongoing.length*100).toFixed(0)}%`} sub="of 108 ongoing" color={G.w}/>
</div>

{/* Tabs */}
<div style={{display:"flex",borderBottom:"2px solid #e0e0e0",padding:"0 16px",background:"white",overflowX:"auto"}}>
{tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"9px 14px",border:"none",background:"none",cursor:"pointer",fontSize:12,fontWeight:tab===t.id?700:400,color:tab===t.id?G.g:"#666",borderBottom:tab===t.id?`3px solid ${G.g}`:"3px solid transparent",marginBottom:-2,whiteSpace:"nowrap"}}>{t.l}</button>)}
</div>

<div style={{padding:16}}>

{/* ═══ OVERVIEW ═══ */}
{tab==="overview"&&<div>
<div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
<div style={{flex:2,minWidth:300,background:"white",borderRadius:8,padding:16,boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}>
<div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Commitments & Disbursements by Cycle ($M)</div>
<ResponsiveContainer width="100%" height={230}><BarChart data={cycleData}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name" tick={{fontSize:11}}/><YAxis tick={{fontSize:11}}/><Tooltip/><Bar dataKey="committed" fill={G.b} name="Committed"/><Bar dataKey="disbursed" fill={G.g} name="Disbursed"/></BarChart></ResponsiveContainer></div>
<div style={{flex:1,minWidth:200,background:"white",borderRadius:8,padding:16,boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}>
<div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Sector Split ($M)</div>
<ResponsiveContainer width="100%" height={230}><PieChart><Pie data={sectorData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({name,value})=>`${name}: ${fmt(value)}`} labelLine={false}>{sectorData.map((_,i)=><Cell key={i} fill={SC[i]}/>)}</Pie><Tooltip formatter={v=>fmt(v)}/></PieChart></ResponsiveContainer></div></div>
<div style={{background:"white",borderRadius:8,padding:16,marginTop:16,boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}>
<div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Disbursement Rate by Cycle (%)</div>
<ResponsiveContainer width="100%" height={170}><BarChart data={cycleData}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name" tick={{fontSize:11}}/><YAxis tick={{fontSize:11}} domain={[0,100]}/><Tooltip/><Bar dataKey="rate" name="Rate %">{cycleData.map((c,i)=><Cell key={i} fill={c.rate>60?G.g:c.rate>30?G.w:G.r}/>)}</Bar></BarChart></ResponsiveContainer></div>
</div>}

{/* ═══ RISK ═══ */}
{tab==="risk"&&<div>
<div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
<KPI l="At-Risk Projects" v={atRisk.length} sub={`${(atRisk.length/ongoing.length*100).toFixed(0)}% of ongoing`} color={G.r}/>
<KPI l="At-Risk Value" v={fmt(atRiskVal)} sub={`${(atRiskVal/ongoing.reduce((s,p)=>s+p.c,0)*100).toFixed(0)}% of ongoing $`} color={G.r}/>
<KPI l="Severely At-Risk" v={ongoing.filter(p=>p.rate<10&&p.age>3).length} sub="<10% after 3yr" color="#B71C1C"/>
<KPI l="Stalled" v={ongoing.filter(p=>p.rate<5&&p.age>4).length} sub="<5% after 4yr" color="#4A148C"/>
</div>
<div style={{background:"white",borderRadius:8,padding:16,boxShadow:"0 1px 3px rgba(0,0,0,0.08)",marginBottom:16}}>
<div style={{fontSize:13,fontWeight:600,marginBottom:12}}>At-Risk Rate by Cycle (% of ongoing)</div>
<ResponsiveContainer width="100%" height={170}><BarChart data={cycleData.filter(c=>c.ongoing>0)}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name" tick={{fontSize:11}}/><YAxis tick={{fontSize:11}} domain={[0,100]}/><Tooltip/><Bar dataKey="riskRate" name="At-Risk %">{cycleData.filter(c=>c.ongoing>0).map((c,i)=><Cell key={i} fill={c.riskRate>50?G.r:c.riskRate>25?G.w:G.g}/>)}</Bar></BarChart></ResponsiveContainer></div>
<div style={{background:"white",borderRadius:8,padding:16,boxShadow:"0 1px 3px rgba(0,0,0,0.08)",overflowX:"auto"}}>
<div style={{fontSize:13,fontWeight:600,marginBottom:8}}>All At-Risk Projects ({atRisk.length}) \u2014 click headers to sort</div>
<div style={{maxHeight:400,overflowY:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
<thead><tr><SH l="Cycle" f="cy" sort={sortR} set={setSortR}/><SH l="Sector" f="se" sort={sortR} set={setSortR}/><SH l="Committed" f="c" sort={sortR} set={setSortR} a="right"/><SH l="Disb %" f="rate" sort={sortR} set={setSortR} a="right"/><SH l="Age (yr)" f="age" sort={sortR} set={setSortR} a="right"/><SH l="Countries" f="co" sort={sortR} set={setSortR}/><SH l="Project" f="t" sort={sortR} set={setSortR}/></tr></thead>
<tbody>{sortedRisk.map((p,i)=><tr key={i} style={{borderBottom:"1px solid #f0f0f0",background:p.rate<5?"#FFF3E0":"white"}}>
<td style={{padding:"5px 6px",fontWeight:600}}>{p.cy}</td>
<td style={{padding:"5px 6px"}}>{p.se}</td>
<td style={{padding:"5px 6px",textAlign:"right",fontWeight:600}}>${p.c.toFixed(0)}M</td>
<td style={{padding:"5px 6px",textAlign:"right",color:rateC(p.rate),fontWeight:600}}>{p.rate.toFixed(1)}%</td>
<td style={{padding:"5px 6px",textAlign:"right"}}>{p.age.toFixed(1)}</td>
<td style={{padding:"5px 6px",fontSize:10}}>{p.co}</td>
<td style={{padding:"5px 6px",maxWidth:220,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.t}</td>
</tr>)}</tbody></table></div></div>
</div>}

{/* ═══ DISBURSEMENT ═══ */}
{tab==="disbursement"&&<div>
<div style={{background:"white",borderRadius:8,padding:16,boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}>
<div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Disbursement Velocity (%/year) \u2014 ongoing projects by cycle</div>
<ResponsiveContainer width="100%" height={190}><BarChart data={velocityData}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name" tick={{fontSize:11}}/><YAxis tick={{fontSize:11}}/><Tooltip/><Bar dataKey="velocity" fill={G.g} name="Velocity (%/yr)"/></BarChart></ResponsiveContainer>
<div style={{fontSize:10,color:"#999",marginTop:6}}>Velocity = avg disbursement rate / avg project age. Higher = faster capital deployment. ADF-14 leads at 6.3%/yr.</div></div>
<div style={{display:"flex",gap:16,marginTop:16,flexWrap:"wrap"}}>
<div style={{flex:1,minWidth:250,background:"white",borderRadius:8,padding:16,boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}>
<div style={{fontSize:13,fontWeight:600,marginBottom:8}}>Velocity Detail</div>
<table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}><thead><tr style={{borderBottom:"2px solid #e0e0e0"}}><th style={{padding:6,textAlign:"left"}}>Cycle</th><th style={{padding:6,textAlign:"right"}}>Avg Age</th><th style={{padding:6,textAlign:"right"}}>Avg Rate</th><th style={{padding:6,textAlign:"right"}}>%/yr</th></tr></thead>
<tbody>{velocityData.map((v,i)=><tr key={i} style={{borderBottom:"1px solid #f0f0f0"}}><td style={{padding:6,fontWeight:600}}>{v.name}</td><td style={{padding:6,textAlign:"right"}}>{v.avgAge}yr</td><td style={{padding:6,textAlign:"right"}}>{v.avgRate}%</td><td style={{padding:6,textAlign:"right",fontWeight:700,color:v.velocity>5?G.g:G.w}}>{v.velocity}</td></tr>)}</tbody></table></div>
<div style={{flex:1,minWidth:250,background:"white",borderRadius:8,padding:16,boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}>
<div style={{fontSize:13,fontWeight:600,marginBottom:8}}>Completion Efficiency</div>
<div style={{fontSize:12,lineHeight:1.9}}>
<div>Avg disbursement at close: <strong>76.7%</strong></div>
<div>Median at close: <strong>82.3%</strong></div>
<div>Funds returned: <strong style={{color:G.w}}>~23%</strong> (~$1 in $4)</div>
<div style={{marginTop:8,borderTop:"1px solid #eee",paddingTop:8}}>Transport: <strong>75.6%</strong> | Power: <strong>80.1%</strong> | Comms: <strong>60.8%</strong></div>
<div style={{fontSize:10,color:"#999",marginTop:8}}>23% of committed funds return unused at close \u2014 potential reallocation opportunity for ADF-17 resource planning</div>
</div></div></div>
</div>}

{/* ═══ PROJECTS ═══ */}
{tab==="projects"&&<div>
<div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search projects or country codes..." style={{flex:1,minWidth:170,padding:"8px 12px",border:"1px solid #ddd",borderRadius:6,fontSize:12}}/>
<select value={cycleF} onChange={e=>setCycleF(e.target.value)} style={{padding:"8px",border:"1px solid #ddd",borderRadius:6,fontSize:12}}><option value="all">All Cycles</option>{[11,12,13,14,15,16].map(c=><option key={c} value={`ADF-${c}`}>ADF-{c}</option>)}</select>
<select value={statusF} onChange={e=>setStatusF(e.target.value)} style={{padding:"8px",border:"1px solid #ddd",borderRadius:6,fontSize:12}}><option value="all">All Status</option><option value="Ongoing">Ongoing</option><option value="Completion">Completed</option><option value="Approved">Approved</option></select>
<select value={sectorF} onChange={e=>setSectorF(e.target.value)} style={{padding:"8px",border:"1px solid #ddd",borderRadius:6,fontSize:12}}><option value="all">All Sectors</option><option value="Transport">Transport</option><option value="Power">Power</option><option value="Communications">Comms</option></select>
</div>
<div style={{fontSize:11,color:"#666",marginBottom:6}}>{filteredP.length} projects \u2014 click column headers to sort \u25B2\u25BC</div>
<div style={{background:"white",borderRadius:8,boxShadow:"0 1px 3px rgba(0,0,0,0.08)",overflowX:"auto",maxHeight:460,overflowY:"auto"}}>
<table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
<thead><tr><SH l="Status" f="s" sort={sortP} set={setSortP}/><SH l="Cycle" f="cy" sort={sortP} set={setSortP}/><SH l="Sector" f="se" sort={sortP} set={setSortP}/><SH l="Committed" f="c" sort={sortP} set={setSortP} a="right"/><SH l="Disbursed" f="d" sort={sortP} set={setSortP} a="right"/><SH l="Rate %" f="rate" sort={sortP} set={setSortP} a="right"/><SH l="Age" f="age" sort={sortP} set={setSortP} a="right"/><SH l="Countries" f="co" sort={sortP} set={setSortP}/><SH l="Project" f="t" sort={sortP} set={setSortP}/></tr></thead>
<tbody>{filteredP.map((p,i)=><tr key={i} style={{borderBottom:"1px solid #f5f5f5",background:p.s==="Ongoing"&&p.rate<20&&p.age>2?"#FFF8E1":"white"}}>
<td style={{padding:"5px 6px",fontWeight:600,fontSize:10,color:p.s==="Completion"?G.g:p.s==="Approved"?G.b:"#333"}}>{p.s==="Completion"?"\u2713":p.s==="Approved"?"\u25CB":"\u25CF"} {p.s}</td>
<td style={{padding:"5px 6px",fontWeight:600}}>{p.cy}</td>
<td style={{padding:"5px 6px"}}>{p.se}</td>
<td style={{padding:"5px 6px",textAlign:"right",fontWeight:600}}>${p.c.toFixed(0)}M</td>
<td style={{padding:"5px 6px",textAlign:"right"}}>${p.d.toFixed(0)}M</td>
<td style={{padding:"5px 6px",textAlign:"right",color:rateC(p.rate),fontWeight:600}}>{p.rate.toFixed(1)}%</td>
<td style={{padding:"5px 6px",textAlign:"right"}}>{p.age.toFixed(1)}</td>
<td style={{padding:"5px 6px",fontSize:10}}>{p.co}</td>
<td style={{padding:"5px 6px",maxWidth:190,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.t}</td>
</tr>)}</tbody></table></div>
</div>}

{/* ═══ KPI FRAMEWORK ═══ */}
{tab==="kpi"&&<div>
<div style={{background:"white",borderRadius:8,padding:16,boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}>
<div style={{fontSize:16,fontWeight:700,marginBottom:4}}>ROE KPI & Indicator Framework</div>
<div style={{fontSize:12,color:"#666",marginBottom:14}}>65 indicators across 5 tiers \u2014 from Board/Deputies strategic reporting to predictive analytics. Based on ADF Results Management Framework, CGD recommendations (Mathiasen & Martinez 2025), and IDA reform benchmarks.</div>
<div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>{KPIS.map((t,i)=><button key={i} onClick={()=>setKpiT(i)} style={{padding:"8px 14px",border:kpiT===i?`2px solid ${G.g}`:"2px solid #e0e0e0",borderRadius:20,background:kpiT===i?"#E8F5E9":"white",cursor:"pointer",fontSize:11,fontWeight:kpiT===i?700:400,color:kpiT===i?G.g:"#666"}}>{t.tier.split(":")[0]}</button>)}</div>
<div style={{fontSize:14,fontWeight:700,color:G.g}}>{KPIS[kpiT].tier}</div>
<div style={{fontSize:11,color:"#666",marginBottom:12,fontStyle:"italic"}}>{KPIS[kpiT].desc}</div>
<div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
<thead><tr style={{borderBottom:"2px solid #ddd",background:"#fafafa"}}>
<th style={{padding:8,textAlign:"left",fontWeight:700}}>KPI / Indicator</th>
<th style={{padding:8,textAlign:"left"}}>Formula / Method</th>
<th style={{padding:8,textAlign:"center",minWidth:80}}>Current</th>
<th style={{padding:8,textAlign:"center",minWidth:70}}>Target</th>
<th style={{padding:8,textAlign:"left"}}>Source / Rationale</th>
</tr></thead>
<tbody>{KPIS[kpiT].items.map((k,i)=><tr key={i} style={{borderBottom:"1px solid #f0f0f0"}}>
<td style={{padding:8,fontWeight:600}}>{k.n}</td>
<td style={{padding:8,color:"#555",fontSize:10}}>{k.f}</td>
<td style={{padding:8,textAlign:"center",fontWeight:600,color:k.cur==="NOT TRACKED"?"#B71C1C":k.cur.includes("To ")|| k.cur.includes("Not ")?G.w:"#333"}}>{k.cur}</td>
<td style={{padding:8,textAlign:"center",color:G.g,fontWeight:600}}>{k.tgt}</td>
<td style={{padding:8,fontSize:10,color:"#777"}}>{k.src}</td>
</tr>)}</tbody></table></div>
</div></div>}

{/* ═══ AI QUERY ═══ */}
{tab==="ai"&&<div>
<div style={{background:"white",borderRadius:8,padding:20,boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}>
<div style={{fontSize:16,fontWeight:700,marginBottom:4}}>Portfolio Intelligence Assistant</div>
<div style={{fontSize:12,color:"#666",marginBottom:14}}>Ask questions about the ROE portfolio in natural language. Powered by Claude (Anthropic API). Pre-loaded with all 197 project metrics.</div>
<div style={{display:"flex",gap:8,marginBottom:14}}>
<input value={aiQ} onChange={e=>setAiQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleAI()} placeholder="e.g., Which corridors need Steering Committee attention?" style={{flex:1,padding:"10px 14px",border:"1px solid #ddd",borderRadius:8,fontSize:13}}/>
<button onClick={handleAI} disabled={aiL} style={{padding:"10px 20px",background:G.g,color:"white",border:"none",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:600,opacity:aiL?0.6:1}}>{aiL?"Analyzing...":"Ask"}</button></div>
<div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>{["Top 5 at-risk projects?","Transport vs Power performance","Countries with lowest disbursement?","ADF-15 cycle analysis","Steering Committee priorities","CGD critique implications"].map(q=><button key={q} onClick={()=>setAiQ(q)} style={{padding:"5px 10px",background:"#f0f0f0",border:"none",borderRadius:16,fontSize:10,cursor:"pointer",color:"#555"}}>{q}</button>)}</div>
{aiR&&<div style={{background:"#F5F5F5",borderRadius:8,padding:16,fontSize:13,lineHeight:1.6,whiteSpace:"pre-wrap",borderLeft:`4px solid ${G.g}`}}>{aiR}</div>}
{!aiR&&<div style={{background:"#F5F5F5",borderRadius:8,padding:20,textAlign:"center",color:"#999",fontSize:12}}>
<div style={{fontSize:14,marginBottom:8}}>How it works</div>
<div>The assistant has pre-computed metrics from all 197 ROE infrastructure projects.</div>
<div style={{marginTop:4}}>Ask about risk, performance, cycles, sectors, countries, CGD recommendations, or strategic priorities.</div>
<div style={{marginTop:8,fontSize:10,color:"#bbb"}}>Powered by Claude (Anthropic). API key is stored securely server-side via Vercel Environment Variables.</div>
</div>}</div></div>}

</div>

{/* Footer */}
<div style={{padding:"10px 16px",textAlign:"center",fontSize:9,color:"#bbb",borderTop:"1px solid #eee"}}>
Data: AfDB Projects Portal (publicly available) | ROE Infrastructure Portfolio (Transport, Power, Communications) ADF-11\u2013ADF-16 | Analysis: O. Zinsou SENOU | March 2026 | Skills demonstration \u2014 not an institutional product
</div></div>);
}
