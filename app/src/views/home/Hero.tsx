import Link from "next/link";
import { SVGProps } from "react";

const Hero = () => {
  return (
    <section className="md:h-screen">
      <div className="container h-full mx-auto px-4 md:px-6 lg:flex lg:items-center">
        <div className="py-[120px] lg:flex lg:items-center">
          <div className="text-center lg:text-left lg:max-w-[41%]">
            <h1 className="text-4xl lg:text-5xl xl:text-[4rem] !leading-tight font-bold">
              The Next-Level <br /> <b>IDO Platform</b>
            </h1>
            <p className="mt-10 text-gray-600 leading-relaxed">
              Loto is the next-level IDO platform built on Solana with the needs
              of both projects and investors alike.
            </p>
            <div className="mt-10 lg:flex space-y-4 lg:space-y-0 space-x-4">
              <Link href="/stake">
                <a href="/stake" className="btn-large btn-primary inline-flex items-center">
                  Stake $LOTO
                </a>
              </Link>
              <button className="btn-large btn-secondary inline-flex items-center">Learn more</button>
            </div>
          </div>
          <figure className="hidden lg:block lg:flex-1 relative min-h-[600px]">
            <img src="/assets/images/hero-bg.png" />
            <Figure1 />
            <Figure2 />
          </figure>
        </div>
      </div>
    </section>
  );
};

const Figure1 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={368}
    height={336}
    viewBox="0 0 368 336"
    fill="none"
    className="absolute bottom-[-10%] left-[5%] xl:left-[15%] transition-opacity-transform ease-in-out duration-1000 delay-100 transform opacity-100"
    {...props}
  >
    <g filter="url(#heroButton_svg__filter0_f)">
      <path
        fill="#000"
        d="M157.342 131.486l81.973 37.264-29.32 39.21-81.973-37.264z"
      />
    </g>
    <g clipPath="url(#heroButton_svg__clip0)">
      <g clipPath="url(#heroButton_svg__clip1)">
        <rect
          width={126}
          height={40}
          rx={11}
          transform="matrix(.85348 .3858 -.63314 .84963 149.438 117.253)"
          fill="#147AFF"
        />
        <g clipPath="url(#heroButton_svg__clip2)" fill="#fff">
          <path d="M161.628 138.664c.233-.313.167-.681-.147-.823-.314-.143-.758-.004-.991.309l-4.046 5.429-.484-2.712c-.057-.321-.418-.484-.805-.363-.387.12-.654.479-.597.801l.735 4.117.001.006a.442.442 0 00.092.201.497.497 0 00.184.141h.002l.001.001a.741.741 0 00.525.015l4.955-1.546c.387-.121.654-.479.597-.801-.058-.321-.418-.484-.805-.364l-3.263 1.019 4.046-5.43z" />
          <path d="M151.295 142.323c.314.142.38.511.147.823l-1.689 2.266a.62.62 0 00-.131.476c.027.154.127.28.278.348l7.966 3.6c.151.069.34.074.526.016a.933.933 0 00.465-.325l1.689-2.265c.233-.313.676-.452.991-.31.314.142.38.511.147.824l-1.689 2.266c-.336.45-.838.801-1.395.975-.558.174-1.125.157-1.578-.048l-7.966-3.6c-.453-.205-.753-.58-.836-1.044-.083-.463.06-.977.395-1.427l1.689-2.266c.233-.313.677-.451.991-.309z" />
        </g>
        <text
          transform="matrix(.85348 .3858 -.63314 .84963 177.246 141.182)"
          fill="#fff"
          fontFamily="Inter"
          fontSize={15}
          fontWeight={500}
          letterSpacing="-.02em"
          style={{
            whiteSpace: "pre",
          }}
        >
          <tspan x={0.22} y={15.454}>
            {"Download"}
          </tspan>
        </text>
      </g>
    </g>
    <g filter="url(#heroButton_svg__filter1_f)">
      <path
        fill="#000"
        d="M157.355 128.482l81.973 37.264-29.32 39.21-81.973-37.264z"
      />
    </g>
    <g clipPath="url(#heroButton_svg__clip3)">
      <g clipPath="url(#heroButton_svg__clip4)">
        <rect
          width={126}
          height={40}
          rx={11}
          transform="matrix(.85348 .3858 -.63314 .84963 149.451 114.25)"
          fill="#147AFF"
        />
        <g clipPath="url(#heroButton_svg__clip5)" fill="#fff">
          <path d="M161.641 135.661c.234-.313.168-.682-.146-.824-.315-.142-.758-.004-.992.309l-4.046 5.43-.483-2.712c-.058-.322-.418-.485-.805-.364-.387.121-.654.479-.597.801l.734 4.118.002.006a.456.456 0 00.276.341l.001.001.002.001a.747.747 0 00.525.015l4.955-1.546c.387-.121.654-.48.597-.801-.058-.322-.418-.485-.805-.364l-3.264 1.018 4.046-5.429z" />
          <path d="M151.309 139.319c.314.142.38.511.146.824l-1.688 2.266a.625.625 0 00-.132.476.47.47 0 00.279.347l7.966 3.601a.75.75 0 00.526.016.933.933 0 00.465-.325l1.688-2.266c.233-.313.677-.451.991-.309.315.142.38.511.147.824l-1.688 2.265a2.796 2.796 0 01-1.396.976c-.557.174-1.125.157-1.577-.048l-7.966-3.601c-.453-.204-.754-.58-.836-1.043-.083-.464.059-.977.395-1.428l1.688-2.265c.234-.313.677-.452.992-.31z" />
        </g>
        <text
          transform="matrix(.85348 .3858 -.63314 .84963 177.26 138.178)"
          fill="#fff"
          fontFamily="Inter"
          fontSize={15}
          fontWeight={500}
          letterSpacing="-.02em"
          style={{
            whiteSpace: "pre",
          }}
        >
          <tspan x={0.22} y={15.454}>
            {"Download"}
          </tspan>
        </text>
      </g>
    </g>
    <rect
      width={101.727}
      height={24}
      rx={12}
      transform="matrix(.9138 .40616 -.62553 .78278 152.08 125.609)"
      fill="#006BF7"
    />
    <text
      transform="matrix(.9138 .40616 -.62553 .78278 157.355 132.197)"
      fill="#fff"
      fontFamily="Inter"
      fontSize={12}
      fontWeight={500}
      letterSpacing="0em"
      style={{
        whiteSpace: "pre",
      }}
    >
      <tspan x={0} y={12.364}>
        {"button-label"}
      </tspan>
    </text>
    <path
      d="M220.865 172.047c.365-.456 1.079-.64 1.594-.411l4.992 2.219-1.32 1.652-4.992-2.219c-.516-.229-.638-.785-.274-1.241zM227.981 173.194l-4.992-2.219c-.516-.229-.639-.785-.274-1.241.364-.456 1.078-.64 1.594-.411l4.992 2.219-1.32 1.652zM226.336 167.09l4.122 1.833.928.412c.484.215.599.736.257 1.164l-.083.103c-.341.427-1.011.6-1.494.385l-.928-.412-4.122-1.833 1.32-1.652z"
      fill="#fff"
    />
    <defs>
      <clipPath id="heroButton_svg__clip0">
        <path
          fill="#fff"
          transform="matrix(.85348 .3858 -.63314 .84963 149.438 117.253)"
          d="M0 0h126v40H0z"
        />
      </clipPath>
      <clipPath id="heroButton_svg__clip1">
        <rect
          width={126}
          height={40}
          rx={11}
          transform="matrix(.85348 .3858 -.63314 .84963 149.438 117.253)"
          fill="#fff"
        />
      </clipPath>
      <clipPath id="heroButton_svg__clip2">
        <path
          fill="#fff"
          transform="matrix(.85348 .3858 -.63314 .84963 155.496 133.622)"
          d="M0 0h16v16H0z"
        />
      </clipPath>
      <clipPath id="heroButton_svg__clip3">
        <path
          fill="#fff"
          transform="matrix(.85348 .3858 -.63314 .84963 149.451 114.25)"
          d="M0 0h126v40H0z"
        />
      </clipPath>
      <clipPath id="heroButton_svg__clip4">
        <rect
          width={126}
          height={40}
          rx={11}
          transform="matrix(.85348 .3858 -.63314 .84963 149.451 114.25)"
          fill="#fff"
        />
      </clipPath>
      <clipPath id="heroButton_svg__clip5">
        <path
          fill="#fff"
          transform="matrix(.85348 .3858 -.63314 .84963 155.51 130.618)"
          d="M0 0h16v16H0z"
        />
      </clipPath>
      <filter
        id="heroButton_svg__filter0_f"
        x={0.021}
        y={3.486}
        width={367.293}
        height={332.474}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation={64} result="effect1_foregroundBlur" />
      </filter>
      <filter
        id="heroButton_svg__filter1_f"
        x={0.035}
        y={0.482}
        width={367.293}
        height={332.474}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation={64} result="effect1_foregroundBlur" />
      </filter>
    </defs>
  </svg>
);

const Figure2 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={449}
    height={405}
    viewBox="0 0 449 405"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute top-[10%] left-[15%] xl:left-[25%] transition-opacity-transform ease-in-out duration-1000 delay-200 transform opacity-100"
    {...props}
  >
    <g filter="url(#heroNavigation_svg__filter0_f)">
      <path
        fill="#000"
        d="M128.816 168.835l153.852-36.42 37.652 108.156-153.852 36.419z"
      />
    </g>
    <g clipPath="url(#heroNavigation_svg__clip0)">
      <rect
        width={200}
        height={152}
        rx={20}
        transform="matrix(.9421 -.23247 .34644 .96871 91.701 123.55)"
        fill="#393B3F"
      />
      <g clipPath="url(#heroNavigation_svg__clip1)">
        <g clipPath="url(#heroNavigation_svg__clip2)">
          <path
            d="M142.447 156.991l-5.006 1.235-1.871-5.231-2.86.706 1.87 5.231-5.005 1.235-3.889-10.872 5.059-5.44 7.804 2.237 3.898 10.899z"
            fill="#fff"
          />
        </g>
        <text
          transform="matrix(.9421 -.23247 .34644 .96871 152.869 136.919)"
          fill="#fff"
          fontFamily="Inter"
          fontSize={14}
          fontWeight={500}
          letterSpacing="0em"
          style={{
            whiteSpace: "pre",
          }}
        >
          <tspan x={0} y={13.591}>
            {"Accueil"}
          </tspan>
        </text>
      </g>
      <g clipPath="url(#heroNavigation_svg__clip3)">
        <g opacity={0.5} clipPath="url(#heroNavigation_svg__clip4)">
          <path
            opacity={0.6}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M151.877 192.275l4.408 2.956-.365.603-4.417-2.953c-.766 1.091-1.813 1.801-3.143 2.129-.807.2-1.636.228-2.489.087a7.051 7.051 0 01-2.369-.835 7.494 7.494 0 01-1.968-1.643 7.106 7.106 0 01-1.323-2.265 6.353 6.353 0 01-.38-2.497c.043-.836.232-1.592.568-2.27a5.323 5.323 0 011.436-1.773 5.395 5.395 0 012.143-1.057 6.101 6.101 0 012.489-.086 7.058 7.058 0 012.369.834 7.498 7.498 0 011.968 1.644 7.132 7.132 0 011.323 2.265c.305.852.432 1.698.381 2.539a5.683 5.683 0 01-.631 2.322zm-3.775 2.015c.951-.235 1.744-.694 2.378-1.376a4.785 4.785 0 001.211-2.442c.173-.945.085-1.907-.265-2.885a6.332 6.332 0 00-1.675-2.538 6.445 6.445 0 00-2.619-1.497 5.496 5.496 0 00-2.896-.074c-.952.235-1.744.693-2.378 1.376a4.777 4.777 0 00-1.211 2.442c-.173.945-.085 1.907.265 2.885a6.337 6.337 0 001.674 2.538 6.435 6.435 0 002.62 1.496 5.496 5.496 0 002.896.075z"
            fill="#fff"
          />
        </g>
        <text
          opacity={0.5}
          transform="matrix(.9421 -.23247 .34644 .96871 166.727 175.667)"
          fill="#fff"
          fontFamily="Inter"
          fontSize={14}
          fontWeight={500}
          letterSpacing="0em"
          style={{
            whiteSpace: "pre",
          }}
        >
          <tspan x={0} y={13.591}>
            {"Rechercher"}
          </tspan>
        </text>
      </g>
      <g clipPath="url(#heroNavigation_svg__clip5)">
        <g clipPath="url(#heroNavigation_svg__clip6)">
          <path
            opacity={0.6}
            d="M159.659 221.33l11.049 12.48-.587.497-11.049-12.481.587-.496zm-3.159 16.327l-5.137-14.363.776-.192 5.137 14.364-.776.191zm4.656-1.149l-5.136-14.363.776-.192 5.136 14.364-.776.191z"
            fill="#fff"
          />
        </g>
        <text
          opacity={0.6}
          transform="matrix(.9421 -.23247 .34644 .96871 180.584 214.416)"
          fill="#fff"
          fontFamily="Inter"
          fontSize={14}
          fontWeight={500}
          letterSpacing="0em"
          style={{
            whiteSpace: "pre",
          }}
        >
          <tspan x={0} y={13.591}>
            {"Biblioth\xE8que"}
          </tspan>
        </text>
      </g>
    </g>
    <g filter="url(#heroNavigation_svg__filter1_f)">
      <path
        fill="#000"
        d="M128.816 164.835l153.852-36.42 37.652 108.156-153.852 36.419z"
      />
    </g>
    <g clipPath="url(#heroNavigation_svg__clip7)">
      <rect
        width={200}
        height={152}
        rx={20}
        transform="matrix(.9421 -.23247 .34644 .96871 91.701 119.55)"
        fill="#393B3F"
      />
      <g clipPath="url(#heroNavigation_svg__clip8)">
        <path
          fill="#66D36E"
          d="M97.244 135.049l4.71-1.162 13.858 38.748-4.71 1.162z"
        />
        <g clipPath="url(#heroNavigation_svg__clip9)">
          <path
            d="M142.447 152.991l-5.006 1.235-1.871-5.231-2.86.706 1.87 5.231-5.005 1.235-3.889-10.872 5.059-5.44 7.804 2.237 3.898 10.899z"
            fill="#fff"
          />
        </g>
        <text
          transform="matrix(.9421 -.23247 .34644 .96871 152.869 132.919)"
          fill="#fff"
          fontFamily="Inter"
          fontSize={14}
          fontWeight={500}
          letterSpacing="0em"
          style={{
            whiteSpace: "pre",
          }}
        >
          <tspan x={0} y={13.591}>
            {"Accueil"}
          </tspan>
        </text>
      </g>
      <g clipPath="url(#heroNavigation_svg__clip10)">
        <g opacity={0.5} clipPath="url(#heroNavigation_svg__clip11)">
          <path
            opacity={0.6}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M151.877 188.275l4.408 2.956-.365.603-4.417-2.953c-.766 1.091-1.813 1.801-3.143 2.129-.807.2-1.636.228-2.489.087a7.051 7.051 0 01-2.369-.835 7.494 7.494 0 01-1.968-1.643 7.106 7.106 0 01-1.323-2.265 6.353 6.353 0 01-.38-2.497c.043-.836.232-1.592.568-2.27a5.323 5.323 0 011.436-1.773 5.395 5.395 0 012.143-1.057 6.101 6.101 0 012.489-.086 7.058 7.058 0 012.369.834 7.498 7.498 0 011.968 1.644 7.132 7.132 0 011.323 2.265c.305.852.432 1.698.381 2.539a5.683 5.683 0 01-.631 2.322zm-3.775 2.015c.951-.235 1.744-.694 2.378-1.376a4.785 4.785 0 001.211-2.442c.173-.945.085-1.907-.265-2.885a6.332 6.332 0 00-1.675-2.538 6.445 6.445 0 00-2.619-1.497 5.496 5.496 0 00-2.896-.074c-.952.235-1.744.693-2.378 1.376a4.777 4.777 0 00-1.211 2.442c-.173.945-.085 1.907.265 2.885a6.337 6.337 0 001.674 2.538 6.435 6.435 0 002.62 1.496 5.496 5.496 0 002.896.075z"
            fill="#fff"
          />
        </g>
        <text
          opacity={0.5}
          transform="matrix(.9421 -.23247 .34644 .96871 166.727 171.667)"
          fill="#fff"
          fontFamily="Inter"
          fontSize={14}
          fontWeight={500}
          letterSpacing="0em"
          style={{
            whiteSpace: "pre",
          }}
        >
          <tspan x={0} y={13.591}>
            {"Rechercher"}
          </tspan>
        </text>
      </g>
      <g clipPath="url(#heroNavigation_svg__clip12)">
        <g clipPath="url(#heroNavigation_svg__clip13)">
          <path
            opacity={0.6}
            d="M159.659 217.33l11.049 12.48-.587.497-11.049-12.481.587-.496zm-3.159 16.327l-5.137-14.363.776-.192 5.137 14.364-.776.191zm4.656-1.149l-5.136-14.363.776-.192 5.136 14.364-.776.191z"
            fill="#fff"
          />
        </g>
        <text
          opacity={0.6}
          transform="matrix(.9421 -.23247 .34644 .96871 180.584 210.416)"
          fill="#fff"
          fontFamily="Inter"
          fontSize={14}
          fontWeight={500}
          letterSpacing="0em"
          style={{
            whiteSpace: "pre",
          }}
        >
          <tspan x={0} y={13.591}>
            {"Biblioth\xE8que"}
          </tspan>
        </text>
      </g>
    </g>
    <rect
      width={113}
      height={24}
      rx={12}
      transform="matrix(.96948 -.24516 .34064 .93813 144.508 131.017)"
      fill="#46494E"
    />
    <text
      transform="matrix(.96948 -.24516 .34064 .93813 161.041 130.933)"
      fill="#fff"
      fontFamily="Inter"
      fontSize={12}
      fontWeight={500}
      letterSpacing="0em"
      style={{
        whiteSpace: "pre",
      }}
    >
      <tspan x={0} y={12.364}>
        {"menu.home"}
      </tspan>
    </text>
    <path
      d="M236.516 123.068c-.199-.547.084-1.103.631-1.241l5.296-1.339.719 1.98-5.296 1.339c-.547.138-1.152-.193-1.35-.739zM242.154 119.696l-5.296 1.339c-.547.138-1.152-.193-1.35-.739-.199-.547.084-1.103.631-1.241l5.296-1.339.719 1.98zM235.324 116.235l4.374-1.106.984-.249c.513-.13 1.08.181 1.266.693l.045.124c.186.512-.079 1.033-.592 1.163l-.984.249-4.374 1.106-.719-1.98z"
      fill="#fff"
    />
    <rect
      width={113}
      height={24}
      rx={12}
      transform="matrix(.96948 -.24516 .34064 .93813 157.508 168.017)"
      fill="#46494E"
    />
    <text
      transform="matrix(.96948 -.24516 .34064 .93813 170.648 168.791)"
      fill="#fff"
      fontFamily="Inter"
      fontSize={12}
      fontWeight={500}
      letterSpacing="0em"
      style={{
        whiteSpace: "pre",
      }}
    >
      <tspan x={0} y={12.364}>
        {"menu.search"}
      </tspan>
    </text>
    <path
      d="M252.908 159.21c-.198-.547.084-1.102.632-1.241l5.296-1.339.719 1.98-5.296 1.339c-.548.138-1.152-.193-1.351-.739zM258.547 155.838l-5.296 1.339c-.547.139-1.152-.193-1.351-.739-.198-.547.085-1.102.632-1.241l5.296-1.339.719 1.98zM251.717 152.377l4.373-1.106.985-.249c.513-.13 1.079.181 1.266.693l.044.124c.187.513-.078 1.033-.592 1.163l-.984.249-4.373 1.106-.719-1.98z"
      fill="#fff"
    />
    <rect
      width={113}
      height={24}
      rx={12}
      transform="matrix(.96948 -.24516 .34064 .93813 170.508 207.017)"
      fill="#46494E"
    />
    <text
      transform="matrix(.96948 -.24516 .34064 .93813 185.102 207.423)"
      fill="#fff"
      fontFamily="Inter"
      fontSize={12}
      fontWeight={500}
      letterSpacing="0em"
      style={{
        whiteSpace: "pre",
      }}
    >
      <tspan x={0} y={12.364}>
        {"menu.library"}
      </tspan>
    </text>
    <path
      d="M264.453 198.577c-.198-.546.084-1.102.632-1.24l5.296-1.339.718 1.98-5.295 1.339c-.548.138-1.152-.193-1.351-.74zM270.092 195.206l-5.296 1.339c-.548.138-1.152-.193-1.351-.74-.198-.546.085-1.102.632-1.24l5.296-1.339.719 1.98zM263.262 191.745l4.373-1.106.984-.249c.514-.13 1.08.18 1.267.693l.044.124c.187.512-.079 1.033-.592 1.163l-.984.249-4.373 1.106-.719-1.98z"
      fill="#fff"
    />
    <defs>
      <clipPath id="heroNavigation_svg__clip0">
        <rect
          width={200}
          height={152}
          rx={20}
          transform="matrix(.9421 -.23247 .34644 .96871 91.701 123.55)"
          fill="#fff"
        />
      </clipPath>
      <clipPath id="heroNavigation_svg__clip1">
        <path
          fill="#fff"
          transform="matrix(.9421 -.23247 .34644 .96871 97.244 139.049)"
          d="M0 0h200v40H0z"
        />
      </clipPath>
      <clipPath id="heroNavigation_svg__clip2">
        <path
          fill="#fff"
          transform="matrix(.9421 -.23247 .34644 .96871 123.07 145.327)"
          d="M0 0h16v16H0z"
        />
      </clipPath>
      <clipPath id="heroNavigation_svg__clip3">
        <path
          fill="#fff"
          transform="matrix(.9421 -.23247 .34644 .96871 111.102 177.797)"
          d="M0 0h200v40H0z"
        />
      </clipPath>
      <clipPath id="heroNavigation_svg__clip4">
        <path
          fill="#fff"
          transform="matrix(.9421 -.23247 .34644 .96871 136.928 184.075)"
          d="M0 0h16v16H0z"
        />
      </clipPath>
      <clipPath id="heroNavigation_svg__clip5">
        <path
          fill="#fff"
          transform="matrix(.9421 -.23247 .34644 .96871 124.959 216.546)"
          d="M0 0h200v40H0z"
        />
      </clipPath>
      <clipPath id="heroNavigation_svg__clip6">
        <path
          fill="#fff"
          transform="matrix(.9421 -.23247 .34644 .96871 150.785 222.824)"
          d="M0 0h16v16H0z"
        />
      </clipPath>
      <clipPath id="heroNavigation_svg__clip7">
        <rect
          width={200}
          height={152}
          rx={20}
          transform="matrix(.9421 -.23247 .34644 .96871 91.701 119.55)"
          fill="#fff"
        />
      </clipPath>
      <clipPath id="heroNavigation_svg__clip8">
        <path
          fill="#fff"
          transform="matrix(.9421 -.23247 .34644 .96871 97.244 135.049)"
          d="M0 0h200v40H0z"
        />
      </clipPath>
      <clipPath id="heroNavigation_svg__clip9">
        <path
          fill="#fff"
          transform="matrix(.9421 -.23247 .34644 .96871 123.07 141.327)"
          d="M0 0h16v16H0z"
        />
      </clipPath>
      <clipPath id="heroNavigation_svg__clip10">
        <path
          fill="#fff"
          transform="matrix(.9421 -.23247 .34644 .96871 111.102 173.797)"
          d="M0 0h200v40H0z"
        />
      </clipPath>
      <clipPath id="heroNavigation_svg__clip11">
        <path
          fill="#fff"
          transform="matrix(.9421 -.23247 .34644 .96871 136.928 180.075)"
          d="M0 0h16v16H0z"
        />
      </clipPath>
      <clipPath id="heroNavigation_svg__clip12">
        <path
          fill="#fff"
          transform="matrix(.9421 -.23247 .34644 .96871 124.959 212.546)"
          d="M0 0h200v40H0z"
        />
      </clipPath>
      <clipPath id="heroNavigation_svg__clip13">
        <path
          fill="#fff"
          transform="matrix(.9421 -.23247 .34644 .96871 150.785 218.824)"
          d="M0 0h16v16H0z"
        />
      </clipPath>
      <filter
        id="heroNavigation_svg__filter0_f"
        x={0.816}
        y={4.416}
        width={447.504}
        height={400.574}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation={64} result="effect1_foregroundBlur" />
      </filter>
      <filter
        id="heroNavigation_svg__filter1_f"
        x={0.816}
        y={0.416}
        width={447.504}
        height={400.574}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation={64} result="effect1_foregroundBlur" />
      </filter>
    </defs>
  </svg>
);

export default Hero;
