import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

import Head from "next/head";
import Image from "next/image";
import useInterval from "../hooks/useInterval";
import { getBusCode } from "../api/bus";
import styles from "../styles/Home.module.css";

const boardingStations = [
  {
    value: "jamuna",
    label: "Jamuna Bus Stop (Hostel G)",
  },
  {
    value: "narmada",
    label: "Narmada Bus Stop",
  },
  {
    value: "sc",
    label: "Sports Complex",
  },
  {
    value: "admin",
    label: "Administration Block",
  },
  {
    value: "gc",
    label: "Gajendra Circle",
  },
  {
    value: "hsb",
    label: "HSB",
  },
  {
    value: "crc",
    label: "CRC",
  },
  {
    value: "ocean",
    label: "Ocean Engg Dept.",
  },
  {
    value: "velachery",
    label: "Velachery Gate",
  },
  {
    value: "kv",
    label: "KV School Stop",
  },
  {
    value: "stop2",
    label: "Stop 2",
  },
  {
    value: "vanaVani",
    label: "Vana Vani School",
  },
  {
    value: "stop1",
    label: "Stop 1",
  },
  {
    value: "mainGate",
    label: "Main Gate",
  },
];

const buses = [
  {
    value: "bus1",
    label: "Bus 1",
  },
  {
    value: "bus2",
    label: "Bus 2",
  },
  {
    value: "bus3",
    label: "Bus 3",
  },
  {
    value: "bus4",
    label: "Bus 4",
  },
];

const coordinates = {
  lat: "",
  lon: "",
};

const busCodeAGC = {
  1: {
    top: -30,
    left: 15,
    angle: 180,
  },
  1.5: {
    top: -3,
    left: 15,
    angle: 180,
  },
  2: {
    top: 29,
    left: 15,
    angle: 180,
  },
  2.5: {
    top: 57,
    left: 15,
    angle: 180,
  },
  3: {
    top: 92,
    left: 15,
    angle: 180,
  },
  3.5: {
    top: 112,
    left: 15,
    angle: 180,
  },
  4: {
    top: 152,
    left: 15,
    angle: 180,
  },
  4.5: {
    top: 177,
    left: 15,
    angle: 180,
  },
  5: {
    top: 255,
    left: 71,
    angle: 270,
  },
  5.5: {
    top: 255,
    left: 85,
    angle: 270,
  },
  6: {
    top: 255,
    left: 115,
    angle: 270,
  },
  6.5: {
    top: 255,
    left: 145,
    angle: 270,
  },
  7: {
    top: 255,
    left: 175,
    angle: 270,
  },
  7.5: {
    top: 255,
    left: 210,
    angle: 270,
  },
  8: {
    top: 255,
    left: 248,
    angle: 270,
  },
  8.5: {
    top: 255,
    left: 248,
    angle: 270,
  },
  9: {
    top: 255,
    left: 345,
    angle: 270,
  },
  9.5: {
    top: 340,
    left: 21,
    angle: 0,
  },
  10: {
    top: 375,
    left: 21,
    angle: 0,
  },
  10.5: {
    top: 435,
    left: 21,
    angle: 0,
  },
  11: {
    top: 500,
    left: 21,
    angle: 0,
  },
  11.5: {
    top: 565,
    left: 21,
    angle: 0,
  },
  12: {
    top: 640,
    left: 21,
    angle: 0,
  },
};

const busCodeTGC = {
  1: {
    top: -20,
    left: 21,
    angle: 0,
  },
  1.5: {
    top: 10,
    left: 21,
    angle: 0,
  },
  2: {
    top: 42,
    left: 21,
    angle: 0,
  },
  2.5: {
    top: 70,
    left: 21,
    angle: 0,
  },
  3: {
    top: 105,
    left: 21,
    angle: 0,
  },
  3.5: {
    top: 125,
    left: 21,
    angle: 0,
  },
  4: {
    top: 165,
    left: 21,
    angle: 0,
  },
  4.5: {
    top: 190,
    left: 21,
    angle: 0,
  },
  5: {
    top: 262,
    left: 56,
    angle: 90,
  },
  5.5: {
    top: 262,
    left: 70,
    angle: 90,
  },
  6: {
    top: 262,
    left: 100,
    angle: 90,
  },
  6.5: {
    top: 262,
    left: 130,
    angle: 90,
  },
  7: {
    top: 262,
    left: 160,
    angle: 90,
  },
  7.5: {
    top: 262,
    left: 195,
    angle: 90,
  },
  8: {
    top: 262,
    left: 233,
    angle: 90,
  },
  8.5: {
    top: 262,
    left: 285,
    angle: 90,
  },
  9: {
    top: 262,
    left: 330,
    angle: 90,
  },
  9.5: {
    top: 325,
    left: 15,
    angle: 180,
  },
  10: {
    top: 360,
    left: 15,
    angle: 180,
  },
  10.5: {
    top: 420,
    left: 15,
    angle: 180,
  },
  11: {
    top: 485,
    left: 15,
    angle: 180,
  },
  11.5: {
    top: 550,
    left: 15,
    angle: 180,
  },
  12: {
    top: 625,
    left: 15,
    angle: 180,
  },
};

const coords = [
  [12.986701, 80.238726],
  [12.986694, 80.238542],
  [12.986693, 80.238407],
  [12.986687, 80.238281],
  [12.986682, 80.238141],
  [12.986674, 80.237979],
  [12.98667, 80.237893],
  [12.986663, 80.237684],
  [12.986662, 80.237578],
  [12.98666, 80.237444],
  [12.986659, 80.237312],
  [12.986656, 80.237178],
  [12.98665, 80.237072],
  [12.986648, 80.23699],
  [12.986646, 80.236889],
  [12.986638, 80.236691],
  [12.986633, 80.236554],
  [12.986629, 80.236436],
  [12.98662, 80.236337],
  [12.98662, 80.236268],
  [12.986616, 80.236137],
  [12.986607, 80.23594],
  [12.986597, 80.2358],
  [12.986594, 80.23568],
  [12.98658, 80.235574],
  [12.986565, 80.235498],
  [12.98653, 80.235384],
  [12.986496, 80.235269],
  [12.986437, 80.235117],
  [12.986368, 80.234968],
  [12.986284, 80.234802],
  [12.986195, 80.234607],
  [12.986146, 80.234493],
  [12.986134, 80.234378],
  [12.986103, 80.234055],
  [12.986101, 80.233814],
  [12.986127, 80.233546],
  [12.986144, 80.233375],
  [12.986344, 80.233321],
  [12.986501, 80.233297],
  [12.986655, 80.233277],
  [12.98677, 80.233284],
  [12.986992, 80.233283],
  [12.987203, 80.233284],
  [12.987351, 80.233262],
  [12.987495, 80.233187],
  [12.987693, 80.233121],
  [12.987891, 80.233058],
  [12.988072, 80.233011],
  [12.988258, 80.232964],
  [12.988406, 80.232922],
  [12.988588, 80.232866],
  [12.988696, 80.232876],
  [12.988826, 80.232888],
  [12.988998, 80.232915],
  [12.989167, 80.232943],
  [12.98932, 80.232971],
  [12.989509, 80.233023],
  [12.989706, 80.233085],
  [12.989967, 80.233165],
  [12.990203, 80.233258],
  [12.990416, 80.23335],
  [12.990497, 80.233386],
  [12.990767, 80.233485],
  [12.990984, 80.233564],
  [12.991205, 80.233618],
  [12.991369, 80.233648],
  [12.991454, 80.233575],
  [12.991426, 80.233495],
  [12.991399, 80.233414],
  [12.991354, 80.233265],
  [12.99131, 80.233119],
  [12.991265, 80.232995],
  [12.99123, 80.232864],
  [12.991195, 80.232745],
  [12.991141, 80.232561],
  [12.991097, 80.232422],
  [12.991061, 80.232272],
  [12.991034, 80.232147],
  [12.991008, 80.232022],
  [12.990982, 80.231916],
  [12.990965, 80.231744],
  [12.990944, 80.231568],
  [12.990934, 80.231411],
  [12.990926, 80.231327],
  [12.990913, 80.231224],
  [12.990914, 80.23113],
  [12.990903, 80.231009],
  [12.990891, 80.230821],
  [12.990873, 80.230629],
  [12.990857, 80.230408],
  [12.990853, 80.230258],
  [12.990835, 80.230048],
  [12.990815, 80.229912],
  [12.990767, 80.22961],
  [12.990675, 80.229322],
  [12.99059, 80.229018],
  [12.990543, 80.228873],
  [12.990495, 80.228698],
  [12.990453, 80.228577],
  [12.990403, 80.228389],
  [12.990358, 80.228234],
  [12.990305, 80.228021],
  [12.990282, 80.22791],
  [12.990251, 80.227745],
  [12.990205, 80.227491],
  [12.990171, 80.227273],
  [12.990124, 80.227088],
  [12.990099, 80.226981],
  [12.990054, 80.226791],
  [12.990015, 80.226589],
  [12.990007, 80.226423],
  [12.990007, 80.22623],
  [12.990036, 80.226131],
  [12.990072, 80.226025],
  [12.990076, 80.225851],
  [12.989973, 80.225597],
  [12.989851, 80.225371],
  [12.989733, 80.225167],
  [12.989645, 80.224983],
  [12.989568, 80.224734],
  [12.989521, 80.224404],
  [12.989509, 80.224218],
  [12.989503, 80.224092],
  [12.989484, 80.223873],
  [12.989364, 80.223602],
  [12.98927, 80.223499],
  [12.989201, 80.223434],
  [12.98909, 80.223358],
  [12.988937, 80.223342],
  [12.98883, 80.22333],
  [12.988755, 80.223323],
  [12.988679, 80.223315],
  [12.988512, 80.223433],
  [12.988676, 80.223313],
  [12.988822, 80.223331],
  [12.988907, 80.223341],
  [12.989021, 80.223351],
  [12.989108, 80.223363],
  [12.989158, 80.223398],
  [12.989209, 80.22344],
  [12.989273, 80.223497],
  [12.989337, 80.223566],
  [12.989405, 80.22366],
  [12.989451, 80.223744],
  [12.98948, 80.223841],
  [12.989489, 80.223929],
  [12.989498, 80.224021],
  [12.989505, 80.224134],
  [12.989514, 80.22426],
  [12.989523, 80.224369],
  [12.989527, 80.22449],
  [12.989537, 80.224585],
  [12.989561, 80.224697],
  [12.989592, 80.224834],
  [12.989648, 80.224994],
  [12.989731, 80.225168],
  [12.989791, 80.225262],
  [12.989857, 80.225392],
  [12.989933, 80.225529],
  [12.990067, 80.225793],
  [12.990075, 80.225892],
  [12.990071, 80.225985],
  [12.990052, 80.226061],
  [12.990036, 80.226146],
  [12.990014, 80.226226],
  [12.990005, 80.226284],
  [12.990004, 80.226362],
  [12.990006, 80.22642],
  [12.990005, 80.226488],
  [12.99001, 80.226571],
  [12.990024, 80.226635],
  [12.990046, 80.226747],
  [12.990067, 80.226864],
  [12.990108, 80.227018],
  [12.990134, 80.227112],
  [12.990159, 80.227218],
  [12.99018, 80.227291],
  [12.990189, 80.227364],
  [12.990202, 80.227488],
  [12.990214, 80.227557],
  [12.990232, 80.227642],
  [12.99025, 80.227729],
  [12.990287, 80.227926],
  [12.990308, 80.228028],
  [12.990349, 80.228193],
  [12.99042, 80.228443],
  [12.990476, 80.228628],
  [12.990525, 80.228803],
  [12.99055, 80.228886],
  [12.990594, 80.229038],
  [12.990631, 80.229168],
  [12.990685, 80.229334],
  [12.990721, 80.229456],
  [12.990757, 80.229583],
  [12.99079, 80.22973],
  [12.990813, 80.229875],
  [12.990831, 80.230016],
  [12.990848, 80.230153],
  [12.990855, 80.230282],
  [12.990865, 80.230448],
  [12.990877, 80.230663],
  [12.990894, 80.230894],
  [12.990916, 80.231175],
  [12.990921, 80.231282],
  [12.990946, 80.231565],
  [12.990962, 80.231749],
  [12.990996, 80.231976],
  [12.991021, 80.232099],
  [12.991074, 80.232344],
  [12.991142, 80.232566],
  [12.991169, 80.232663],
  [12.991197, 80.232757],
  [12.991226, 80.232855],
  [12.991266, 80.232988],
  [12.991323, 80.233186],
  [12.991403, 80.23345],
  [12.991447, 80.233572],
  [12.991574, 80.233582],
  [12.991659, 80.233685],
  [12.991745, 80.23371],
  [12.991939, 80.233721],
  [12.992044, 80.233727],
  [12.992294, 80.233741],
  [12.992501, 80.233765],
  [12.992721, 80.233801],
  [12.992861, 80.233831],
  [12.993077, 80.233893],
  [12.993192, 80.23394],
  [12.99337, 80.234016],
  [12.993448, 80.234056],
  [12.993509, 80.234096],
  [12.993639, 80.234202],
  [12.9937, 80.234253],
  [12.993826, 80.234356],
  [12.993981, 80.234506],
  [12.994091, 80.234595],
  [12.994201, 80.234676],
  [12.994354, 80.234775],
  [12.994539, 80.23486],
  [12.994605, 80.234904],
  [12.99475, 80.234959],
  [12.994848, 80.235009],
  [12.994969, 80.235064],
  [12.995125, 80.235158],
  [12.995334, 80.23529],
  [12.99543, 80.235358],
  [12.995569, 80.235467],
  [12.995717, 80.235581],
  [12.995844, 80.235706],
  [12.995973, 80.235844],
  [12.996017, 80.235894],
  [12.996099, 80.236012],
  [12.996199, 80.236156],
  [12.996314, 80.236351],
  [12.996387, 80.236485],
  [12.996441, 80.236613],
  [12.996504, 80.236739],
  [12.996578, 80.236891],
  [12.996638, 80.237018],
  [12.996723, 80.237184],
  [12.996851, 80.237392],
  [12.997048, 80.237699],
  [12.997223, 80.237973],
  [12.997302, 80.238091],
  [12.997414, 80.238254],
  [12.997512, 80.238387],
  [12.997594, 80.2385],
  [12.997731, 80.238693],
  [12.997824, 80.238805],
  [12.997982, 80.238932],
  [12.99817, 80.239019],
  [12.998395, 80.239089],
  [12.998624, 80.239155],
  [12.998892, 80.239237],
  [12.999055, 80.239272],
  [12.999338, 80.239345],
  [12.99971, 80.239399],
  [12.999953, 80.239443],
  [13.000155, 80.239477],
  [13.000262, 80.239499],
  [13.000452, 80.239528],
  [13.000748, 80.23957],
  [13.000953, 80.239609],
  [13.001172, 80.239646],
  [13.001371, 80.239687],
  [13.001562, 80.23974],
  [13.00176, 80.239784],
  [13.00195, 80.239849],
  [13.002207, 80.239932],
  [13.00237, 80.239993],
  [13.002628, 80.240079],
  [13.002889, 80.240173],
  [13.003106, 80.240239],
  [13.003319, 80.240305],
  [13.003459, 80.240369],
  [13.003565, 80.240464],
  [13.003674, 80.240747],
  [13.003756, 80.240952],
  [13.003844, 80.241162],
  [13.003912, 80.241318],
  [13.004039, 80.241614],
  [13.00413, 80.241727],
  [13.004348, 80.241827],
  [13.004446, 80.241843],
  [13.004743, 80.241819],
  [13.004866, 80.241827],
  [13.004969, 80.241828],
  [13.005084, 80.241824],
  [13.005197, 80.241807],
  [13.005286, 80.241795],
  [13.005345, 80.241759],
  [13.00542, 80.241771],
  [13.005563, 80.241789],
  [13.005718, 80.241796],
  [13.005832, 80.241808],
];

export default function Home() {
  const [boardingStation, setBoardingStation] = useState("");
  const [busTab, setBus] = useState("bus1");

  const [locationCoord, setLocationCoord] = useState(coordinates);

  const [busLocationCode, setBusLocationCode] = useState(0);

  const [btgc, setBTGC] = useState(true);

  const [mockIndex, setMockIndex] = useState(0);

  const [showLive, setShowLive] = useState(false);

  const handleChangeBoardingStation = (event) => {
    setBoardingStation(event.target.value);
  };

  const handleChangeCoord = (val, key) => {
    const temp = { ...locationCoord };
    temp[key] = val;
    setLocationCoord(temp);
  };

  const getBusCodeFunc = async () => {
    const res = await getBusCode(locationCoord["lat"], locationCoord["lon"]);
    if (res && res["code"]) setBusLocationCode(parseFloat(res["code"]));
  };

  useEffect(() => {
    if (locationCoord["lat"] && locationCoord["lon"]) getBusCodeFunc();
  }, [locationCoord["lat"], locationCoord["lon"]]);

  useInterval(() => {
    if (showLive) {
      let tempIndex = mockIndex;
      if (tempIndex === coords.length) tempIndex = 0;

      const [tempLat, tempLon] = coords[tempIndex];
      const tempCoord = {
        lat: tempLat.toString(),
        lon: tempLon.toString(),
      };

      setLocationCoord(tempCoord);
      setMockIndex(tempIndex + 1);
    }
  }, 1000);

  return (
    <>
      <Head>
        <title>Buzzinga</title>
      </Head>
      <div className={styles.headCont}>
        <div className={styles.headContS1} style={{ width: "60%" }}>
          <div className={styles.headContS1S1}>Your Boarding Location:</div>
          <div className={styles.headContS1S2}>
            <Image
              src="/icons/location.svg" // Route of the image file
              height={24} // Desired size with correct aspect ratio
              width={24} // Desired size with correct aspect ratio
              alt="buzzinga"
            />
            <div style={{ width: "100%", marginLeft: 10 }}>
              <Select
                value={boardingStation}
                onChange={handleChangeBoardingStation}
                fullWidth
                size="small"
              >
                {boardingStations.map((bs, i) => (
                  <MenuItem key={i} value={bs["value"]}>
                    {bs["label"]}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <div
          className={styles.headContS2}
          style={{ width: "22%", marginLeft: "10%" }}
        >
          <div className={styles.headContS1S1}>Est. ETA</div>
          <div className={styles.headContS2S2}>12 min</div>
        </div>
      </div>

      {/*<div className={styles.tabCont}>
        {buses.map((bus, i) => (
          <div
            key={i}
            className={
              bus["value"] === busTab ? styles.tabSelected : styles.tab
            }
            onClick={() => setBus(bus["value"])}
          >
            {bus["label"]}
          </div>
        ))}
      </div> */}

      <div className={styles.tempInpCont}>
        <div className={styles.tempInpContS1}>
          <TextField
            value={locationCoord["lat"]}
            onChange={(e) => handleChangeCoord(e.target.value, "lat")}
            type="number"
            variant="outlined"
            size="small"
            placeholder="Latitude"
          />
          <TextField
            value={locationCoord["lon"]}
            onChange={(e) => handleChangeCoord(e.target.value, "lon")}
            type="number"
            variant="outlined"
            size="small"
            placeholder="Longitude"
          />
        </div>
        <Button
          disabled={!(locationCoord["lat"] && locationCoord["lon"])}
          variant="contained"
          onClick={getBusCodeFunc}
        >
          Continue
        </Button>
      </div>

      <div style={{ margin: "10px auto", width: 160 }}>
        <FormControlLabel
          control={
            <Switch
              checked={btgc}
              onChange={(e) => setBTGC(e.target.checked)}
            />
          }
          label="Towards GC"
        />
      </div>
      <div style={{ margin: "10px auto", width: 160 }}>
        <FormControlLabel
          control={
            <Switch
              checked={showLive}
              onChange={(e) => setShowLive(e.target.checked)}
            />
          }
          label="Show Live"
        />
      </div>

      <div className={styles.mapCont}>
        <Image
          src={`/mapSVG/route${
            busLocationCode >= 0 && busLocationCode < 9 ? "1" : "2"
          }.svg`} // Route of the image file
          height={682} // Desired size with correct aspect ratio
          width={406} // Desired size with correct aspect ratio
          alt="buzzinga"
        />
        {busLocationCode > 0 && (
          <div
            className={styles.busIcon}
            style={{
              top: btgc
                ? busCodeTGC[`${busLocationCode}`]["top"]
                : busCodeAGC[`${busLocationCode}`]["top"],
              left: btgc
                ? busCodeTGC[`${busLocationCode}`]["left"]
                : busCodeAGC[`${busLocationCode}`]["left"],
              transform: `rotate(${
                btgc
                  ? busCodeTGC[`${busLocationCode}`]["angle"]
                  : busCodeAGC[`${busLocationCode}`]["angle"]
              }deg)`,
            }}
          >
            <Image
              src="/icons/bus.svg" // Route of the image file
              height={87} // Desired size with correct aspect ratio
              width={62} // Desired size with correct aspect ratio
              alt="buzzinga"
            />
          </div>
        )}
      </div>
    </>
  );
}
