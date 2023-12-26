import React from "react";
import { Stop } from "react-native-svg";
import { LinearGradient } from "react-native-svg";
import { Ellipse } from "react-native-svg";
import { Svg, Defs, G, Circle, Path, Text } from "react-native-svg";

const MinisLike = (props) => {
  return (
    <Svg
      fill={props?.color}
      height={props?.height}
      viewBox='0 0 24 24'
      width={props?.width}
    >
      <Path d='M22.773 7.721A4.994 4.994 0 0 0 19 6h-3.989l.336-2.041a3.037 3.037 0 0 0-5.721-1.837L8 5.417V21h10.3a5.024 5.024 0 0 0 4.951-4.3l.705-5a4.994 4.994 0 0 0-1.183-3.979ZM0 11v5a5.006 5.006 0 0 0 5 5h1V6H5a5.006 5.006 0 0 0-5 5Z' />
    </Svg>
  );
};

export default MinisLike;

// export const MinisCOIN = (props) => {
//   return (
//     <Svg
//       fill={props?.color}
//       height={props?.height}
//       viewBox='0 96 960 960'
//       width={props?.width}
//     >
//       <Path d='M 451 863 h 55 v -52 q 61 -7 95 -37.5 t 34 -81.5 q 0 -51 -29 -83 t -98 -61 q -58 -24 -84 -43 t -26 -51 q 0 -31 22.5 -49 t 61.5 -18 q 30 0 52 14 t 37 42 l 48 -23 q -17 -35 -45 -55 t -66 -24 v -51 h -55 v 51 q -51 7 -80.5 37.5 T 343 454 q 0 49 30 78 t 90 54 q 67 28 92 50.5 t 25 55.5 q 0 32 -26.5 51.5 T 487 763 q -39 0 -69.5 -22 T 375 681 l -51 17 q 21 46 51.5 72.5 T 451 809 v 54 Z m 29 113 q -82 0 -155 -31.5 t -127.5 -86 Q 143 804 111.5 731 T 80 576 q 0 -83 31.5 -156 t 86 -127 Q 252 239 325 207.5 T 480 176 q 83 0 156 31.5 T 763 293 q 54 54 85.5 127 T 880 576 q 0 82 -31.5 155 T 763 858.5 q -54 54.5 -127 86 T 480 976 Z m 0 -60 q 142 0 241 -99.5 T 820 576 q 0 -142 -99 -241 t -241 -99 q -141 0 -240.5 99 T 140 576 q 0 141 99.5 240.5 T 480 916 Z m 0 -340 Z' />
//     </Svg>
//   );
// };

// export default MinisCOIN;

/* SVGR has dropped some elements not supported by react-native-svg: style */
export const MinisCOIN = (props) => (
  // <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 332 332" {...props}>
  //   <Defs></Defs>
  //   <G
  //     style={{
  //       isolation: 'isolate',
  //     }}
  //   >
  //     <G id="Layer_1" data-name="Layer 1">
  //       <Circle
  //         cx={166}
  //         cy={166}
  //         r={166}
  //         style={{
  //           fill: '#fee475',
  //         }}
  //       />
  //       <Path
  //         d="M267.76 64.63 63.19 269.2a144.91 144.91 0 0 0 48.4 31.8l188-188a144.81 144.81 0 0 0-31.83-48.37ZM94.74 40l-55 55a144.11 144.11 0 0 0-14 34.46L129.2 26a144.11 144.11 0 0 0-34.46 14ZM248.7 48.54 47.1 250.14q3.53 5 7.44 9.64L258.34 56c-3.1-2.64-6.34-5.11-9.64-7.46Z"
  //         className="cls-3"
  //         style={{
  //           fill: 'none', // Remove black color by making it transparent
  //         }}
  //       />
  //       <Path
  //         d="M272.85 169.31c-2.35 137.79-207.31 137.76-209.64 0 2.35-137.79 207.31-137.77 209.64 0Z"
  //         className="cls-3"
  //         style={{
  //           fill: 'none', // Remove black color by making it transparent
  //         }}
  //       />
  //       <Path
  //         d="M391.1 243.38c-3.13 183-275.31 183-278.41 0 3.12-182.99 275.31-182.96 278.41 0Z"
  //         style={{
  //           fill: '#feb724',
  //         }}
  //         transform="translate(-86 -77)"
  //       />
  //       <Path
  //         d="M165.79 23.26a148.43 148.43 0 0 1 148.38 145.61c.12-198.85-296.93-198.76-296.77 0A148.43 148.43 0 0 1 165.79 23.26Z"
  //         className="cls-3"
  //         style={{
  //           fill: 'none', // Remove black color by making it transparent
  //         }}
  //       />
  //       <Text
  //         style={{
  //           fontSize: 233,
  //           // fontFamily: 'ArialNarrow-Bold,Arial',
  //           fontWeight: 700,
  //           fill: '#fff',
  //         }}
  //         transform="translate(90.29 247.31)"
  //       >
  //         {'S'}
  //       </Text>
  //     </G>
  //   </G>
  // </Svg>

  <Svg
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    id='Capa_1'
    x='0px'
    y='0px'
    viewBox='0 0 511.996 511.996'
    style={{
      enableBackground: "new 0 0 511.996 511.996",
    }}
    xmlSpace='preserve'
    width={34}
    height={34}
  >
    <LinearGradient
      id='SVGID_1_'
      gradientUnits='userSpaceOnUse'
      x1={184.6503}
      y1={455.8867}
      x2={217.9803}
      y2={394.2657}
      gradientTransform='matrix(1.0039 0 0 -1.0039 0.1922 516.5605)'
    >
      <Stop
        offset={0}
        style={{
          stopColor: "#9EB644",
        }}
      />
      <Stop
        offset={1}
        style={{
          stopColor: "#738611",
        }}
      />
    </LinearGradient>
    <Path
      style={{
        fill: "url(#SVGID_1_)",
      }}
      d='M437.388,170.465L333.876,10.439c-7.32-10.844-22.045-13.702-32.889-6.382L54.448,170.465  H437.388z'
    />
    <LinearGradient
      id='SVGID_2_'
      gradientUnits='userSpaceOnUse'
      x1={199.7224}
      y1={365.8692}
      x2={14.8824}
      y2={315.3392}
      gradientTransform='matrix(1.0039 0 0 -1.0039 0.1922 516.5605)'
    >
      <Stop
        offset={0}
        style={{
          stopColor: "#9EB644",
        }}
      />
      <Stop
        offset={1}
        style={{
          stopColor: "#738611",
        }}
      />
    </LinearGradient>
    <Path
      style={{
        fill: "url(#SVGID_2_)",
      }}
      d='M449.649,170.465L378.674,32.646c-6.554-12.727-22.184-17.73-34.909-11.176L54.448,170.465  H449.649z'
    />
    <LinearGradient
      id='SVGID_3_'
      gradientUnits='userSpaceOnUse'
      x1={260.9595}
      y1={337.1728}
      x2={260.9595}
      y2={-170.6972}
      gradientTransform='matrix(1.0039 0 0 -1.0039 0.1922 516.5605)'
    >
      <Stop
        offset={0}
        style={{
          stopColor: "#816965",
        }}
      />
      <Stop
        offset={1}
        style={{
          stopColor: "#654E48",
        }}
      />
    </LinearGradient>
    <Path
      style={{
        fill: "url(#SVGID_3_)",
      }}
      d='M431.044,486.666H93.306c-27.522,0-49.833-22.311-49.833-49.833V166.181  c0-27.522,22.311-49.833,49.833-49.833h337.738c27.522,0,49.833,22.311,49.833,49.833v270.652  C480.877,464.355,458.566,486.666,431.044,486.666z'
    />
    <LinearGradient
      id='SVGID_4_'
      gradientUnits='userSpaceOnUse'
      x1={506.8558}
      y1={137.5736}
      x2={393.8258}
      y2={250.6036}
      gradientTransform='matrix(1.0039 0 0 -1.0039 0.1922 516.5605)'
    >
      <Stop
        offset={0}
        style={{
          stopColor: "#654E48",
          stopOpacity: 0,
        }}
      />
      <Stop
        offset={1}
        style={{
          stopColor: "#503837",
        }}
      />
    </LinearGradient>
    <Path
      style={{
        fill: "url(#SVGID_4_)",
      }}
      d='M480.877,436.833V261.926h-81.174c-21.86,0-39.581,17.721-39.581,39.581  c0,11.557,4.955,21.954,12.854,29.19l107.857,107.857C480.853,437.983,480.877,437.41,480.877,436.833z'
    />
    <LinearGradient
      id='SVGID_5_'
      gradientUnits='userSpaceOnUse'
      x1={426.0155}
      y1={240.4928}
      x2={426.0155}
      y2={131.9328}
      gradientTransform='matrix(1.0039 0 0 -1.0039 0.1922 516.5605)'
    >
      <Stop
        offset={0}
        style={{
          stopColor: "#654E48",
        }}
      />
      <Stop
        offset={1}
        style={{
          stopColor: "#503837",
        }}
      />
    </LinearGradient>
    <Path
      style={{
        fill: "url(#SVGID_5_)",
      }}
      d='M480.544,341.088h-82.183c-21.86,0-39.581-17.721-39.581-39.581l0,0  c0-21.86,17.721-39.581,39.581-39.581h82.183c9.076,0,16.433,7.358,16.433,16.433v46.295  C496.978,333.73,489.62,341.088,480.544,341.088z'
    />
    <LinearGradient
      id='SVGID_6_'
      gradientUnits='userSpaceOnUse'
      x1={388.375}
      y1={224.9028}
      x2={429.705}
      y2={183.5728}
      gradientTransform='matrix(1.0039 0 0 -1.0039 0.1922 516.5605)'
    >
      <Stop
        offset={0}
        style={{
          stopColor: "#FFE7A5",
        }}
      />
      <Stop
        offset={0.966}
        style={{
          stopColor: "#FFBF5C",
        }}
      />
    </LinearGradient>
    <Circle
      style={{
        fill: "url(#SVGID_6_)",
      }}
      cx={400.822}
      cy={301.508}
      r={25.94}
    />
    <LinearGradient
      id='SVGID_7_'
      gradientUnits='userSpaceOnUse'
      x1={235.1342}
      y1={-28.0975}
      x2={172.3142}
      y2={135.6225}
      gradientTransform='matrix(1.0039 0 0 -1.0039 0.1922 516.5605)'
    >
      <Stop
        offset={0}
        style={{
          stopColor: "#654E48",
          stopOpacity: 0,
        }}
      />
      <Stop
        offset={1}
        style={{
          stopColor: "#503837",
        }}
      />
    </LinearGradient>
    <Path
      style={{
        fill: "url(#SVGID_7_)",
      }}
      d='M93.306,486.666h275.565L266.457,384.252c-18.983-18.983-47.516-22.568-70.125-10.786  l-17.439-17.388c-10.952-11.758-26.562-19.118-43.897-19.118c-31.472,0-57.265,24.24-59.772,55.065  c-11.026-0.04-22.054,2.956-31.75,8.957v35.851C43.473,464.355,65.784,486.666,93.306,486.666z'
    />
    <LinearGradient
      id='SVGID_8_'
      gradientUnits='userSpaceOnUse'
      x1={204.715}
      y1={71.2828}
      x2={290.485}
      y2={157.0528}
      gradientTransform='matrix(1.0039 0 0 -1.0039 0.1922 516.5605)'
    >
      <Stop
        offset={0}
        style={{
          stopColor: "#FFE7A5",
        }}
      />
      <Stop
        offset={0.966}
        style={{
          stopColor: "#FFBF5C",
        }}
      />
    </LinearGradient>
    <Circle
      style={{
        fill: "url(#SVGID_8_)",
      }}
      cx={224.042}
      cy={426.667}
      r={59.99}
    />
    <LinearGradient
      id='SVGID_9_'
      gradientUnits='userSpaceOnUse'
      x1={240.305}
      y1={106.8728}
      x2={158.775}
      y2={25.3428}
      gradientTransform='matrix(1.0039 0 0 -1.0039 0.1922 516.5605)'
    >
      <Stop
        offset={0}
        style={{
          stopColor: "#FFE7A5",
        }}
      />
      <Stop
        offset={0.966}
        style={{
          stopColor: "#FFBF5C",
        }}
      />
    </LinearGradient>
    <Circle
      style={{
        fill: "url(#SVGID_9_)",
      }}
      cx={224.042}
      cy={426.667}
      r={57.024}
    />
    <LinearGradient
      id='SVGID_10_'
      gradientUnits='userSpaceOnUse'
      x1={209.5139}
      y1={76.0839}
      x2={272.714}
      y2={139.2739}
      gradientTransform='matrix(1.0039 0 0 -1.0039 0.1922 516.5605)'
    >
      <Stop
        offset={0}
        style={{
          stopColor: "#FFE7A5",
        }}
      />
      <Stop
        offset={0.966}
        style={{
          stopColor: "#FFBF5C",
        }}
      />
    </LinearGradient>
    <Circle
      style={{
        fill: "url(#SVGID_10_)",
      }}
      cx={224.042}
      cy={426.667}
      r={44.203}
    />
    <G>
      <Path
        style={{
          fill: "#DB9E36",
        }}
        d='M196.851,421.8l3.343-3.307c1.034-1.023,2.416-1.648,4.146-1.874   c1.73-0.227,3.541-0.189,5.432,0.113l5.688,0.927c1.895,0.309,3.707,0.371,5.434,0.189c1.726-0.184,3.072-0.752,4.037-1.707   c0.964-0.954,1.495-2.105,1.592-3.453c0.096-1.348-0.457-2.631-1.663-3.851c-1.024-1.035-2.141-1.592-3.349-1.672   c-1.209-0.079-2.371,0.435-3.491,1.542c-0.365,0.361-0.862,0.5-1.489,0.415c-0.627-0.086-1.225-0.417-1.794-0.991   c-1.092-1.104-0.961-2.327,0.398-3.67c1.794-1.775,3.948-2.531,6.464-2.265c2.516,0.265,4.729,1.363,6.641,3.296   c2.025,2.047,3.108,4.424,3.249,7.131c0.141,2.706-0.805,5.064-2.838,7.076c-1.378,1.363-3.051,2.256-5.019,2.677   c-1.969,0.422-3.912,0.501-5.831,0.237c-1.92-0.263-3.793-0.572-5.62-0.927c-1.827-0.354-3.502-0.542-5.021-0.563   c-1.521-0.021-2.636,0.321-3.348,1.025l-1.309,1.294l10.037,10.145c0.318,0.322,0.442,0.758,0.37,1.306   c-0.071,0.549-0.326,1.039-0.763,1.472c-0.438,0.433-0.942,0.694-1.512,0.783c-0.571,0.09-1.015-0.025-1.331-0.344l-12.07-12.2   c-0.361-0.365-0.603-0.839-0.724-1.421C196.394,422.602,196.506,422.141,196.851,421.8z'
      />
      <Path
        style={{
          fill: "#DB9E36",
        }}
        d='M218.068,433.855c1.127-1.114,2.282-1.074,3.467,0.121c1.229,1.242,1.36,2.341,0.395,3.297   c-0.966,0.956-1.344,2.092-1.133,3.409c0.21,1.317,0.884,2.55,2.023,3.7c2.732,2.761,5.546,2.707,8.444-0.161l0.656-0.649   c1.449-1.434,2.183-2.866,2.203-4.296c0.019-1.431-0.619-2.8-1.917-4.112l-4.95-5.004c-1.024-1.035-1.066-2.017-0.126-2.947   c0.229-0.226,0.564-0.437,1.008-0.631l10.064-8.617c0.873-0.728,1.549-0.849,2.027-0.366l10.14,10.248   c0.363,0.367,0.482,0.809,0.353,1.323c-0.13,0.514-0.412,0.988-0.848,1.42c-0.437,0.433-0.914,0.71-1.429,0.833   c-0.516,0.123-0.956,0-1.319-0.367l-7.887-7.971l-7.171,6.14l3.039,3.071c2.344,2.369,3.629,4.831,3.856,7.383   c0.226,2.552-0.915,5.07-3.421,7.55l-0.656,0.649c-2.6,2.572-5.214,3.76-7.845,3.562c-2.63-0.197-5.095-1.458-7.394-3.781   c-2.367-2.392-3.647-4.87-3.839-7.434C215.611,437.663,216.366,435.539,218.068,433.855z'
      />
    </G>
    <LinearGradient
      id='SVGID_11_'
      gradientUnits='userSpaceOnUse'
      x1={211.7156}
      y1={68.1334}
      x2={128.8556}
      y2={148.9934}
      gradientTransform='matrix(1.0039 0 0 -1.0039 0.1922 516.5605)'
    >
      <Stop
        offset={0}
        style={{
          stopColor: "#FF5D00",
          stopOpacity: 0,
        }}
      />
      <Stop
        offset={1}
        style={{
          stopColor: "#D54003",
        }}
      />
    </LinearGradient>
    <Path
      style={{
        fill: "url(#SVGID_11_)",
      }}
      d='M274.494,459.12l-82.906-82.906c-3.53,2.275-6.88,4.946-9.97,8.036  c-23.428,23.428-23.428,61.412,0,84.839c23.428,23.428,61.412,23.428,84.839,0C269.547,466,272.219,462.651,274.494,459.12z'
    />
    <LinearGradient
      id='SVGID_12_'
      gradientUnits='userSpaceOnUse'
      x1={373.1448}
      y1={44.5748}
      x2={-15.4252}
      y2={165.8748}
      gradientTransform='matrix(1.0039 0 0 -1.0039 0.1922 516.5605)'
    >
      <Stop
        offset={0}
        style={{
          stopColor: "#FFE7A5",
        }}
      />
      <Stop
        offset={0.966}
        style={{
          stopColor: "#FFBF5C",
        }}
      />
    </LinearGradient>
    <Circle
      style={{
        fill: "url(#SVGID_12_)",
      }}
      cx={134.994}
      cy={396.95}
      r={59.99}
    />
    <LinearGradient
      id='SVGID_13_'
      gradientUnits='userSpaceOnUse'
      x1={374.494}
      y1={190.4228}
      x2={-14.076}
      y2={75.1228}
      gradientTransform='matrix(1.0039 0 0 -1.0039 0.1922 516.5605)'
    >
      <Stop
        offset={0}
        style={{
          stopColor: "#FFE7A5",
        }}
      />
      <Stop
        offset={0.966}
        style={{
          stopColor: "#FFBF5C",
        }}
      />
    </LinearGradient>
    <Circle
      style={{
        fill: "url(#SVGID_13_)",
      }}
      cx={134.994}
      cy={396.95}
      r={57.024}
    />
    <LinearGradient
      id='SVGID_14_'
      gradientUnits='userSpaceOnUse'
      x1={379.757}
      y1={62.6827}
      x2={-8.813}
      y2={152.0527}
      gradientTransform='matrix(1.0039 0 0 -1.0039 0.1922 516.5605)'
    >
      <Stop
        offset={0}
        style={{
          stopColor: "#FFE7A5",
        }}
      />
      <Stop
        offset={0.966}
        style={{
          stopColor: "#FFBF5C",
        }}
      />
    </LinearGradient>
    <Circle
      style={{
        fill: "url(#SVGID_14_)",
      }}
      cx={134.994}
      cy={396.95}
      r={44.203}
    />
    <G>
      <Path
        style={{
          fill: "#DB9E36",
        }}
        d='M111.095,406.135c0.009-1.585,0.854-2.374,2.537-2.365c1.748,0.009,2.617,0.694,2.61,2.053   s0.529,2.43,1.609,3.213c1.079,0.782,2.428,1.178,4.047,1.187c3.883,0.021,5.836-2.008,5.857-6.085l0.005-0.923   c0.011-2.039-0.483-3.57-1.481-4.595c-0.998-1.025-2.418-1.542-4.263-1.552l-7.038-0.037c-1.456-0.008-2.181-0.673-2.173-1.994   c0.002-0.321,0.09-0.708,0.266-1.16l1.024-13.21c0.102-1.131,0.494-1.697,1.174-1.693l14.416,0.077   c0.517,0.003,0.913,0.232,1.186,0.686c0.272,0.455,0.408,0.99,0.405,1.604c-0.003,0.615-0.145,1.148-0.421,1.599   c-0.278,0.453-0.676,0.676-1.193,0.673l-11.214-0.059l-0.729,9.413l4.32,0.023c3.332,0.018,5.981,0.849,7.947,2.494   c1.965,1.645,2.938,4.232,2.919,7.757l-0.005,0.923c-0.02,3.657-1.029,6.346-3.028,8.065c-2,1.721-4.633,2.572-7.902,2.555   c-3.366-0.018-6.023-0.864-7.971-2.542C112.05,410.567,111.082,408.531,111.095,406.135z'
      />
      <Path
        style={{
          fill: "#DB9E36",
        }}
        d='M137.027,404.041l0.075-14.124c0.02-3.721,1.021-6.45,3.005-8.187   c1.983-1.737,4.625-2.596,7.926-2.579s5.941,0.906,7.922,2.663c1.981,1.758,2.962,4.499,2.941,8.219l-0.075,14.124   c-0.02,3.722-1.03,6.45-3.029,8.187c-2,1.737-4.649,2.596-7.95,2.579c-3.301-0.018-5.934-0.906-7.898-2.663   C137.978,410.502,137.007,407.763,137.027,404.041z M142.172,404.068c-0.022,4.174,1.875,6.272,5.694,6.293   c1.844,0.01,3.271-0.5,4.28-1.531c1.008-1.03,1.519-2.596,1.53-4.7l0.075-14.124c0.011-2.103-0.482-3.675-1.48-4.716   c-0.998-1.04-2.418-1.566-4.263-1.576c-3.819-0.02-5.739,2.056-5.762,6.231L142.172,404.068z'
      />
    </G>
    <LinearGradient
      id='SVGID_15_'
      gradientUnits='userSpaceOnUse'
      x1={142.7364}
      y1={53.3742}
      x2={62.3164}
      y2={133.7942}
      gradientTransform='matrix(1.0039 0 0 -1.0039 0.1922 516.5605)'
    >
      <Stop
        offset={0}
        style={{
          stopColor: "#FF5D00",
          stopOpacity: 0,
        }}
      />
      <Stop
        offset={1}
        style={{
          stopColor: "#D54003",
        }}
      />
    </LinearGradient>
    <Path
      style={{
        fill: "url(#SVGID_15_)",
      }}
      d='M118.855,411.09c-10.904-11.679-26.408-19.003-43.631-19.064  c-0.133,1.625-0.218,3.265-0.218,4.924c0,33.131,26.859,59.99,59.99,59.99c8.724,0,17.004-1.877,24.483-5.226L118.855,411.09z'
    />
    <LinearGradient
      id='SVGID_16_'
      gradientUnits='userSpaceOnUse'
      x1={92.7795}
      y1={46.0473}
      x2={7.0145}
      y2={131.8173}
      gradientTransform='matrix(1.0039 0 0 -1.0039 0.1922 516.5605)'
    >
      <Stop
        offset={0}
        style={{
          stopColor: "#FFE7A5",
        }}
      />
      <Stop
        offset={0.966}
        style={{
          stopColor: "#FFBF5C",
        }}
      />
    </LinearGradient>
    <Circle
      style={{
        fill: "url(#SVGID_16_)",
      }}
      cx={75.009}
      cy={452.005}
      r={59.99}
    />
    <LinearGradient
      id='SVGID_17_'
      gradientUnits='userSpaceOnUse'
      x1={57.19}
      y1={81.6378}
      x2={138.72}
      y2={0.1078}
      gradientTransform='matrix(1.0039 0 0 -1.0039 0.1922 516.5605)'
    >
      <Stop
        offset={0}
        style={{
          stopColor: "#FFE7A5",
        }}
      />
      <Stop
        offset={0.966}
        style={{
          stopColor: "#FFBF5C",
        }}
      />
    </LinearGradient>
    <Circle
      style={{
        fill: "url(#SVGID_17_)",
      }}
      cx={75.009}
      cy={452.005}
      r={57.024}
    />
    <LinearGradient
      id='SVGID_18_'
      gradientUnits='userSpaceOnUse'
      x1={87.9848}
      y1={50.8426}
      x2={24.7868}
      y2={114.0426}
      gradientTransform='matrix(1.0039 0 0 -1.0039 0.1922 516.5605)'
    >
      <Stop
        offset={0}
        style={{
          stopColor: "#FFE7A5",
        }}
      />
      <Stop
        offset={0.966}
        style={{
          stopColor: "#FFBF5C",
        }}
      />
    </LinearGradient>
    <Circle
      style={{
        fill: "url(#SVGID_18_)",
      }}
      cx={75.009}
      cy={452.005}
      r={44.203}
    />
    <G>
      <Path
        style={{
          fill: "#DB9E36",
        }}
        d='M69.47,479.853l-3.307-3.343c-1.023-1.034-1.648-2.416-1.874-4.146   c-0.227-1.73-0.189-3.541,0.113-5.432l0.927-5.688c0.309-1.895,0.371-3.707,0.189-5.434c-0.184-1.726-0.752-3.072-1.707-4.037   c-0.954-0.964-2.105-1.495-3.453-1.592c-1.348-0.096-2.631,0.458-3.851,1.664c-1.035,1.024-1.592,2.141-1.672,3.349   c-0.079,1.209,0.435,2.371,1.542,3.491c0.361,0.365,0.5,0.862,0.415,1.489c-0.086,0.627-0.417,1.225-0.991,1.794   c-1.104,1.092-2.327,0.961-3.67-0.398c-1.775-1.794-2.531-3.948-2.265-6.464c0.265-2.516,1.363-4.729,3.296-6.641   c2.047-2.025,4.424-3.108,7.13-3.249c2.706-0.141,5.064,0.805,7.076,2.838c1.363,1.378,2.256,3.051,2.677,5.019   c0.422,1.969,0.501,3.912,0.237,5.831c-0.263,1.919-0.572,3.793-0.927,5.62c-0.354,1.827-0.542,3.502-0.563,5.021   c-0.021,1.521,0.321,2.636,1.025,3.348l1.294,1.309l10.145-10.037c0.322-0.318,0.758-0.442,1.306-0.37   c0.549,0.071,1.04,0.326,1.472,0.763c0.433,0.438,0.694,0.942,0.783,1.512c0.09,0.571-0.025,1.015-0.344,1.331l-12.2,12.07   c-0.365,0.361-0.839,0.603-1.421,0.724C70.272,480.31,69.811,480.199,69.47,479.853z'
      />
      <Path
        style={{
          fill: "#DB9E36",
        }}
        d='M81.232,455.785l-9.935-10.041c-2.617-2.645-3.839-5.284-3.664-7.914   c0.174-2.63,1.435-5.107,3.781-7.428c2.346-2.322,4.842-3.561,7.485-3.719c2.643-0.158,5.275,1.087,7.892,3.732l9.935,10.041   c2.617,2.645,3.833,5.29,3.647,7.931c-0.186,2.642-1.452,5.124-3.799,7.445c-2.346,2.322-4.836,3.556-7.468,3.701   C86.474,459.681,83.85,458.431,81.232,455.785z M84.89,452.167c2.936,2.968,5.761,3.108,8.475,0.423   c1.311-1.297,1.96-2.666,1.945-4.109c-0.015-1.441-0.762-2.909-2.242-4.405l-9.935-10.041c-1.479-1.495-2.939-2.258-4.381-2.289   c-1.442-0.03-2.818,0.602-4.129,1.899c-2.715,2.685-2.603,5.513,0.332,8.48L84.89,452.167z'
      />
    </G>
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
  </Svg>
);
export const MinisCOINNew = ({ width, height }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    id='Capa_1'
    enableBackground='new 0 0 512 512'
    height={height}
    viewBox='0 0 512 512'
    width={width}
  >
    <G>
      <G>
        <Path
          d='m256 512c-141.159 0-256-114.841-256-256s114.841-256 256-256 256 114.841 256 256-114.841 256-256 256z'
          fill='#fff16b'
        />
      </G>
      <Path
        d='m512 256c0-141.159-114.841-256-256-256v512c141.159 0 256-114.841 256-256z'
        fill='#ffd400'
      />
      <G>
        <Path
          d='m256 451c-107.523 0-195-87.477-195-195s87.477-195 195-195 195 87.477 195 195-87.477 195-195 195z'
          fill='#ffd400'
        />
      </G>
      <Path
        d='m451 256c0-107.523-87.477-195-195-195v390c107.523 0 195-87.477 195-195z'
        fill='#ff9f00'
      />
      <Path
        d='m300.138 227.161-32.425-40.531c-6.005-7.506-17.421-7.506-23.426 0l-32.425 40.531-49.154-24.577c-11.164-5.582-23.865 4.118-21.417 16.358l20 100c1.403 7.011 7.559 12.058 14.709 12.058h160c7.15 0 13.306-5.047 14.709-12.058l20-100c2.448-12.24-10.252-21.94-21.417-16.358z'
        fill='#fff16b'
      />
      <Path
        d='m336 331c7.15 0 13.306-5.047 14.709-12.058l20-100c2.448-12.24-10.252-21.94-21.417-16.358l-49.154 24.577-32.425-40.531c-3.002-3.753-7.358-5.63-11.713-5.63v150z'
        fill='#ffd400'
      />
    </G>
  </Svg>

  // <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 332 332" {...props}>
  //   <Defs></Defs>
  //   <G
  //     style={{
  //       isolation: 'isolate',
  //     }}
  //   >
  //     <G id="Layer_1" data-name="Layer 1">
  //       <Circle
  //         cx={166}
  //         cy={166}
  //         r={166}
  //         style={{
  //           fill: '#fee475',
  //         }}
  //       />
  //       <Path
  //         d="M267.76 64.63 63.19 269.2a144.91 144.91 0 0 0 48.4 31.8l188-188a144.81 144.81 0 0 0-31.83-48.37ZM94.74 40l-55 55a144.11 144.11 0 0 0-14 34.46L129.2 26a144.11 144.11 0 0 0-34.46 14ZM248.7 48.54 47.1 250.14q3.53 5 7.44 9.64L258.34 56c-3.1-2.64-6.34-5.11-9.64-7.46Z"
  //         className="cls-3"
  //       />
  //       <Path
  //         d="M272.85 169.31c-2.35 137.79-207.31 137.76-209.64 0 2.35-137.79 207.31-137.77 209.64 0Z"
  //         className="cls-3"
  //       />
  //       <Path
  //         d="M391.1 243.38c-3.13 183-275.31 183-278.41 0 3.12-182.99 275.31-182.96 278.41 0Z"
  //         style={{
  //           fill: '#feb724',
  //         }}
  //         transform="translate(-86 -77)"
  //       />
  //       <Path
  //         d="M165.79 23.26a148.43 148.43 0 0 1 148.38 145.61c.12-198.85-296.93-198.76-296.77 0A148.43 148.43 0 0 1 165.79 23.26Z"
  //         className="cls-3"
  //       />
  //       <Text
  //         style={{
  //           fontSize: 233,
  //           // fontFamily: 'ArialNarrow-Bold,Arial',
  //           fontWeight: 700,
  //           fill: '#fff',
  //         }}
  //         transform="translate(90.29 247.31)"
  //       >
  //         {'S'}
  //       </Text>
  //     </G>
  //   </G>
  // </Svg>

  // <Svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   viewBox="0 0 332 332"
  //   width={24}
  //   height={24}
  //   {...props}
  // >
  //   <Defs></Defs>
  //   <G
  //     style={{
  //       isolation: 'isolate',
  //     }}
  //   >
  //     <G id="Layer_1" data-name="Layer 1">
  //       <Circle
  //         cx={166}
  //         cy={166}
  //         r={166}
  //         style={{
  //           fill: '#fee475',
  //         }}
  //       />
  //       <Path
  //         d="M267.76 64.63 63.19 269.2a144.91 144.91 0 0 0 48.4 31.8l188-188a144.81 144.81 0 0 0-31.83-48.37ZM94.74 40l-55 55a144.11 144.11 0 0 0-14 34.46L129.2 26a144.11 144.11 0 0 0-34.46 14ZM248.7 48.54 47.1 250.14q3.53 5 7.44 9.64L258.34 56c-3.1-2.64-6.34-5.11-9.64-7.46Z"
  //         className="cls-3"
  //       />
  //       <Path
  //         d="M272.85 169.31c-2.35 137.79-207.31 137.76-209.64 0 2.35-137.79 207.31-137.77 209.64 0Z"
  //         className="cls-3"
  //       />
  //       <Path
  //         d="M391.1 243.38c-3.13 183-275.31 183-278.41 0 3.12-182.99 275.31-182.96 278.41 0Z"
  //         style={{
  //           fill: '#feb724',
  //         }}
  //         transform="translate(-86 -77)"
  //       />
  //       <Path
  //         d="M165.79 23.26a148.43 148.43 0 0 1 148.38 145.61c.12-198.85-296.93-198.76-296.77 0A148.43 148.43 0 0 1 165.79 23.26Z"
  //         className="cls-3"
  //       />
  //       <Text
  //         style={{
  //           fontSize: 233,
  //           //fontFamily: 'Montserrat-ExtraBold,Montserrat ExtraBold',
  //           fontWeight: 800,
  //           fill: '#fff',
  //         }}
  //         transform="translate(90.29 247.31)"
  //       >
  //         {'S'}
  //       </Text>
  //     </G>
  //   </G>
  // </Svg>

  // <Svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   xmlnsXlink="http://www.w3.org/1999/xlink"
  //   viewBox="0 0 512 512"
  //   width={24}
  //   height={24}
  //   {...props}
  // >
  //   <Defs></Defs>
  //   <G
  //     style={{
  //       isolation: 'isolate',
  //     }}
  //   >
  //     <G id="Layer_1" data-name="Layer 1">
  //       <Image
  //         xlinkHref="data:image/png;base64,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"
  //         width={380}
  //         height={374}
  //         className="cls-2"
  //         transform="translate(68 63)"
  //       />
  //       <Path
  //         d="M410.42 243C406.85 452.34 95.49 452.31 92 243c3.52-209.29 314.88-209.26 318.42 0Z"
  //         className="cls-3"
  //       />
  //       <Path
  //         d="M353.76 141.63 149.19 346.2a144.91 144.91 0 0 0 48.4 31.8l188-188a144.81 144.81 0 0 0-31.83-48.37ZM180.74 117l-55 55a144.11 144.11 0 0 0-14 34.46L215.2 103a144.11 144.11 0 0 0-34.46 14ZM334.7 125.54l-201.6 201.6q3.53 5 7.44 9.64L344.34 133c-3.1-2.64-6.34-5.11-9.64-7.46Z"
  //         className="cls-4"
  //       />
  //       <Path
  //         d="M358.85 246.31c-2.35 137.79-207.31 137.76-209.64 0 2.35-137.79 207.31-137.77 209.64 0Z"
  //         className="cls-4"
  //       />
  //       <Path
  //         d="M391.1 243.38c-3.13 183-275.31 183-278.41 0 3.12-182.99 275.31-182.96 278.41 0Z"
  //         style={{
  //           fill: '#feb724',
  //         }}
  //       />
  //       <Path
  //         d="M120.25 250.94C116.14 132.21 271.13 66.54 354 148.82 220.41 12.9 21.47 212 157.33 345.5a138.7 138.7 0 0 1-37.08-94.56Z"
  //         style={{
  //           fill: '#fb9d12',
  //         }}
  //       />
  //       <Path
  //         d="M251.79 100.26a148.43 148.43 0 0 1 148.38 145.61c.12-198.85-296.93-198.76-296.77 0a148.43 148.43 0 0 1 148.39-145.61Z"
  //         className="cls-4"
  //       />
  //       <Image
  //         xlinkHref="data:image/png;base64,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"
  //         width={268}
  //         height={268}
  //         className="cls-2"
  //         transform="translate(127 119)"
  //       />
  //       <Path
  //         d="M253.63 147.67c-57.15 0-103.48 45.16-103.48 100.88s46.33 100.89 103.48 100.89 103.49-45.17 103.49-100.89-46.33-100.88-103.49-100.88Zm-1.86 140c-21.63 0-39.16-17.09-39.16-38.17s17.53-38.17 39.16-38.17 39.16 17.09 39.16 38.17-17.53 38.13-39.16 38.13Z"
  //         className="cls-3"
  //       />
  //       <Path
  //         d="M152 229.47s10.1-72.47 88.83-85.86c0 0 42.11-7.65 78.73 24.88 0 0 29.87 21.7 36.63 64.61 2 12.92 0 29.09-24.82 19.27-5-2-10.93-5.42-18.07-12 0 0-41.42-34.34-63.39-38.17 0 0-49.38-25.36-97.91 27.27Z"
  //         style={{
  //           fill: '#f4d038',
  //         }}
  //       />
  //     </G>
  //   </G>
  // </Svg>
);
export const StickerSvg = ({ type }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    id='Capa_1'
    x='0px'
    y='0px'
    viewBox='0 0 512 512'
    style={{
      enableBackground: "new 0 0 512 512",
    }}
    xmlSpace='preserve'
    width={24}
    height={24}
  >
    <>
      <G>
        <G>
          <Path
            style={{
              fill: "#29AEFD",
            }}
            d='M485.73,454.645c-1.82-1.764-5.468-26.457-8.78-26.262c-3.323,0.205-6.215,24.693-7.765,26.306    c-3.113,3.237-25.885,5.529-25.698,8.665c0.187,3.131,22.547,4.611,25.704,7.67c1.768,1.707,5.471,26.467,8.791,26.273    c3.314-0.194,6.152-24.615,7.765-26.286c3.007-3.126,25.954-5.537,25.764-8.686C511.327,459.175,488.774,457.6,485.73,454.645z'
          />
          <Path
            style={{
              fill: "#29AEFD",
            }}
            d='M291.468,35.186c-1.823-1.764-5.473-26.457-8.783-26.262c-3.323,0.204-6.212,24.693-7.765,26.306    c-3.114,3.237-25.885,5.527-25.698,8.665c0.187,3.131,22.547,4.614,25.704,7.669c1.768,1.707,5.471,26.472,8.791,26.273    c3.315-0.193,6.152-24.612,7.768-26.285c3.004-3.128,25.951-5.537,25.764-8.686C317.063,39.717,294.507,38.141,291.468,35.186z'
          />
          <Path
            style={{
              fill: "#29AEFD",
            }}
            d='M42.735,194.547c-1.82-1.764-5.471-26.459-8.783-26.262c-3.323,0.205-6.215,24.695-7.765,26.308    c-3.113,3.239-25.885,5.528-25.698,8.665c0.187,3.132,22.55,4.613,25.704,7.668c1.768,1.709,5.474,26.47,8.791,26.275    c3.314-0.193,6.155-24.614,7.768-26.285c3.007-3.128,25.951-5.538,25.764-8.686C68.329,199.08,45.773,197.502,42.735,194.547z'
          />
          <Path
            style={{
              fillRule: "evenodd",
              clipRule: "evenodd",
              fill: "#FD6085",
            }}
            d='M462.837,143.721c-3.45-4.466-7.687-8.736-12.324-11.859    c-2.809-1.889-14.138-5.888-14.48-9.928c-0.578-6.773-0.469-13.689-1.851-20.294c-5.014-23.985-19.221-34.35-43.198-30.488    c-10.918,1.756-22.001,4.884-31.997,9.549c-31.804,14.849-61.74,33.009-90.253,53.542c-10.249,7.38-20.96,14.149-31.715,20.789    c-24.566,15.163-26.009-38.319-27.765-50.853c-2.685-19.185-3.674-38.556-6.368-57.737c-1.894-13.486-3.205-36.423-17.137-43.657    c-21.196-11.012-29.685,13.157-33.633,28.277c-3.752,14.36-5.376,29.138-7.564,43.79c-3.424,22.932-6.819,45.871-9.8,68.868    c-4.318,33.278-7.403,66.712-11.019,100.08c-2.809,25.912-23.39,40.887-39.161,59.259c-35.148,40.936-5.129,98.778,19.149,136.838    c8.15,12.777,17.212,25.215,26.845,36.91c11.764,14.279,24.836,27.439,43.174,33.653c19.969,6.76,36.068-10.361,51.428-20.069    c16.812-10.624,36.065-17.893,55.134-23.247c28.058-7.879,56.217-15.402,84.353-23.007    c47.225-12.764,102.485-39.785,126.041-85.295c6.721-12.983,10.634-27.998,10.801-42.631c0.086-7.477-0.88-15.45-3.815-22.383    c-2.964-6.993-10.433-12.194-12.805-19.249c-2.518-7.503,1.944-15.939,3.03-23.316c1.32-8.957-0.034-18.796-3.542-27.12    c-3.355-7.959-10.726-14.098-12.902-22.507c-1.866-7.201-0.451-14.333,0.788-21.51c2.13-12.328-1.09-25.117-8.484-35.169    C463.464,144.542,463.154,144.132,462.837,143.721z'
          />
          <Path
            style={{
              fillRule: "evenodd",
              clipRule: "evenodd",
              fill: "#074785",
            }}
            d='M177.067,46.915c6.486-11.896,4.419-29.54,3.66-41.983    c-0.106-1.571-0.265-3.004-0.477-4.314c-17.209-4.499-24.545,16.707-28.133,30.445c-1.984,7.594-3.372,15.307-4.562,23.055    C159.269,56.212,169.279,61.749,177.067,46.915z'
          />
          <Path
            style={{
              fill: "#074785",
            }}
            d='M480.653,353.946c-19.526,13.06-40.153,25.13-62.329,33.088    c-10.223,3.665-20.995,5.659-31.778,6.568c-27.811,2.344-44.39-22.7-24.22-45c0.096-0.106,0.177-0.215,0.264-0.322    c11.063-1.601,22.166-5.509,30.373-8.322c32.149-11.028,66.406-27.131,95.166-45.142c7.308-4.579,0.745-16.3-6.618-11.692    c-26.184,16.402-55.502,28.153-83.744,40.58c-20.032,8.809-56.499,23.871-68.093-7.766c-9.053-24.721,22.064-42.675,38.204-52.76    c0.335-0.21,0.632-0.439,0.91-0.676c38.176-6.449,76.97-28.205,106.517-44.72c7.156-4.002,0.742-15.744-6.422-11.738    c-27.714,15.491-56.499,29.233-86.837,38.383c-13.014,3.923-26.469,5.788-40.066,6.169c-7.311,0.036-14.495-1.133-21.561-3.501    c-32.342-9.222-25.79-47.047,0.23-57.114c0.753-0.291,1.395-0.688,1.94-1.156c42.293-0.359,98.349-41.26,119.619-57.771    c6.095-4.728-0.052-16.578-6.215-11.794c-31.951,24.8-69.166,46.144-108.459,54.142c-14.981,3.047-30.312,0.578-36.398-18.836    c-5.307-16.911,11.545-31.089,21.265-38.697c14.113-11.048,31.445-17.909,48.401-22.09c7.44-1.835,4.157-14.86-3.274-13.023    c-27.472,6.776-108.194,44.684-71.506,91.69c4.72,6.047,10.358,10.197,16.648,12.815c-24.474,18.985-29.822,54.96,7.538,71.596    c10.648,4.744,21.844,7.026,33.304,7.449c-24.625,20.599-42.783,50.13-12.108,77.544c4.141,3.7,9.165,5.725,14.622,6.61    c-13.596,23.585-4.891,51.648,25.663,57.816c39.641,8.009,84.512-19.852,115.588-40.636    C494.42,360.86,487.874,349.121,480.653,353.946z'
          />
          <G>
            <Path
              style={{
                fill: "#074785",
              }}
              d='M124.981,257.389c3.818,41.643,11.488,83.763,45.485,111.608c6.615,5.418,16.3-3.907,9.59-9.405     c-31.232-25.577-38.149-63.711-41.648-101.896C137.627,249.156,124.193,248.786,124.981,257.389L124.981,257.389z'
            />
          </G>
          <Path
            style={{
              fillRule: "evenodd",
              clipRule: "evenodd",
              fill: "#074785",
            }}
            d='M229.677,266.509c-12.324,2.284-24.169-5.858-26.449-18.185    c-2.283-12.327,5.856-24.169,18.186-26.454c12.324-2.281,24.166,5.86,26.451,18.188    C250.148,252.385,242.004,264.228,229.677,266.509z'
          />
          <Path
            style={{
              fillRule: "evenodd",
              clipRule: "evenodd",
              fill: "#074785",
            }}
            d='M293.291,406.922c-12.324,2.281-24.169-5.861-26.449-18.188    c-2.283-12.327,5.856-24.17,18.186-26.454c12.327-2.281,24.172,5.862,26.452,18.189    C313.763,392.795,305.621,404.64,293.291,406.922z'
          />
          <Path
            style={{
              fillRule: "evenodd",
              clipRule: "evenodd",
              fill: "#074785",
            }}
            d='M257.447,337.998c-19.29,1.535-28.251-24.534-18.991-38.761    c4.43-6.809-5.951-13.97-10.392-7.143c-15.699,24.124,1.521,60.704,31.681,58.306C267.849,349.75,265.471,337.36,257.447,337.998z    '
          />
          <Path
            style={{
              fill: "#FFFFFF",
            }}
            d='M150.185,121.414c-8.265,24.469-9.401,50.305-11.695,75.818c-0.658,7.38,10.832,7.318,11.491,0    c2.205-24.541,3.329-49.224,11.284-72.764C163.642,117.431,152.542,114.433,150.185,121.414z'
          />
          <Path
            style={{
              fill: "#FFFFFF",
            }}
            d='M162.871,97.541c-7.406,0-7.406,11.488,0,11.488C170.282,109.029,170.282,97.541,162.871,97.541z'
          />
          <Path
            style={{
              fill: "#FFFFFF",
            }}
            d='M417.883,93.605c-3.915-3.806-8.561-6.848-13.417-9.323c-2.789-1.422-6.21-0.753-7.857,2.061    c-1.512,2.585-0.727,6.44,2.061,7.86c4.004,2.041,7.857,4.38,11.091,7.525C415.075,106.891,423.205,98.774,417.883,93.605z'
          />
          <Path
            style={{
              fill: "#FFFFFF",
            }}
            d='M287.455,444.224c-7.408,0-7.408,11.488,0,11.488S294.864,444.224,287.455,444.224z'
          />
          <Path
            style={{
              fill: "#FFFFFF",
            }}
            d='M260.909,452.087c-16.461,3.759-32.96,9.021-46.814,18.963c-5.962,4.276-0.233,14.246,5.799,9.917    c13.135-9.421,28.47-14.24,44.071-17.801C271.186,461.517,268.122,450.443,260.909,452.087z'
          />
          <Path
            style={{
              fill: "#FFFFFF",
            }}
            d='M199.126,481.495c-7.408,0-7.408,11.489,0,11.489C206.531,492.985,206.531,481.495,199.126,481.495    z'
          />
        </G>
      </G>
    </>
  </Svg>
);
