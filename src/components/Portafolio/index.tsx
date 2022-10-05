import Image from 'next/image'
const Portafolio = () => {
  return (
    <>
      <div>
        <hr />
        <div>
          <div>
            <div>
              <Image
                src={'./img/avatar_profile.png'}
                alt={'img present portafoly'}
                height={400}
                width={400}
              />
            </div>
            <div className="container">
              <div className=""></div>
              <div className="py-3 px-3">
                <div className="container grid grid-cols-3 space-x-2">
                  <div>Github</div>
                  <div>View</div>
                  {/* <div></div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Portafolio
