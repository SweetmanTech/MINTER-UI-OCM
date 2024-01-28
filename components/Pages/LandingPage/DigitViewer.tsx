const DigitViewer = ({ label, digit }) => (
  <div>
    <div
      className="font-bold 
                    text-[7px] xl:text-[20px]
                    text-center pb-[3px] xl:pb-[15px]"
    >
      {label}
    </div>
    <div
      className="grid grid-cols-2 
                gap-x-[3px] xl:gap-x-[10px]"
    >
      <div
        className="text-center text-white flex items-center justify-center
                    leading-[100%]
                    text-[35px] xl:text-[98px] font-medium bg-black rounded-[10px]
                    min-w-[30px] samsungS8:min-w-[35px] xl:min-w-[80px] xl:h-[102px] h-[44px]"
      >
        {digit.length > 1 ? digit[0] : "0"}
      </div>
      <div
        className="text-center text-white flex items-center justify-center
                    leading-[100%]
                    text-[35px] xl:text-[98px] font-medium bg-black rounded-[10px]
                    min-w-[30px] samsungS8:min-w-[35px] xl:min-w-[80px] xl:h-[102px] h-[44px]"
      >
        {digit.length > 1 ? digit[1] : digit[0]}
      </div>
    </div>
  </div>
)

export default DigitViewer
