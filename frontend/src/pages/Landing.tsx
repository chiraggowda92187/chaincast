import CTAButton from "../components/CTAButton";
import Button from "../components/GetStartedButton";
import Navbar from "../components/Navbar";
import { motion } from "motion/react"

export default function Landing() {

  return (
    <>
      <div className="w-screen overflow-hidden bg-black text-mainwhite tracking-[-0.03em]">
        <Navbar />
        <section className="relative h-[calc(100dvh-4rem)] w-full  bg-cover bg-[url(/img/bg/hero.jpg)]">
          <div className="absolute z-0 w-full h-full bg-gradient-to-b from-black/0 to-black/100"></div>
          <div className="w-full h-full flex flex-1 absolute z-10 inset-0">
            <div className="w-full flex flex-col items-center justify-center ">
              <div className="w-[75%] overflow-hidden">
                <motion.h1
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{
                    duration: 2,
                    ease: "anticipate"
                  }}

                  className="text-6xl font-bold w-full tracking-[-0.05em]">Real time on chain tracking, simplified for you</motion.h1>
              </div>
              <div className="text-sm text-[#9B9CAB] font-extralight mt-8 flex gap-2 w-[75%]">
                <div>Powered by </div>
                <div className="flex gap-2"><img src="/img/icons/solana.png" width={20} alt="" />

                  <p>SOLANA</p></div>
              </div>
              <div className="w-[75%] mt-[2rem]"><Button title="Start Now" /></div>
            </div>
            <div className="w-full h-full flex flex-col justify-end ">
              <p className="w-[81%] text-md text-thirdgray mb-[10em]">Stop waiting for updates. No more frontend polling required. Get real-time, human-readable transaction insights delivered instantly to your device no manual refreshes, no missed details.</p>
            </div>
          </div>
        </section>
        <section id="features" className="w-full max-h-max">
          <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-cryptonite">Instant</h1>
            <h1 className="text-4xl font-semibold">Stay Informed everywhere</h1>
            <p className="text-xs font-light text-thirdgray w-[40%] text-center leading-[1em] mt-[1rem]">Our advanced technology eliminates the need for constant manual updates. Receive live data streams directly to your dashboard with zero lag.</p>
            <div className="grid grid-cols-3 mx-3 w-[90%] h-[180dvh] mt-[3rem] gap-[1.5rem]">
              <div className="flex flex-col gap-[1.5rem] h-full">
                <motion.div
                  // initial={{y : 20, opacity : 0}}
                  // animate = {{ y : 0, opacity : 100}}
                  
                  whileHover={{
                    scale: 1.04,
                    
                  }}
                  transition={{
                    duration: 0.3,
                    // ease : "anticipate"
                  }}

                  className="h-[55%]  rounded-md border-[1px] border-secondary">
                  <div className="w-full h-[50%] bg-[url('/img/landing/devices.jpg')] bg-cover bg-center overflow-hidden ">
                    {/* <img */}
                    {/* src="/img/landing/devices.jpg"
                      alt="devices" */}
                    {/* className="w-full h-full object-cover" */}
                    {/* /> */}
                  </div>

                  <div className="h-[50%] w-full flex justify-center items-center">
                    <div className="w-[90%] h-[90%]">
                      <h1 className="text-sm text-cryptonite">Devices</h1>
                      <h1 className="text-2xl font-semibold">Real-time updates on any device</h1>
                      <p className="text-xs font-light text-thirdgray w-[90%] leading-[1em] mt-[1rem]">Access your crypto insights from smartphones, tablets, and desktops seamlessly.</p>
                      <div className="mt-[1rem]">
                        <CTAButton title="Explore" />
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{
                    scale: 1.04
                  }}
                  transition={{
                    duration: 0.3
                  }} className="h-[45%] rounded-md border-[1px] border-secondary flex flex-col justify-center">
                  <div className="h-[50%] w-full flex justify-center items-center">
                    <div className="w-[90%] h-[90%]">
                      {/* <h1 className="text-sm text-cryptonite">Instant</h1> */}
                      <h1 className="text-2xl font-semibold">On chain data made simple, understandable</h1>
                      <p className="text-xs font-light text-thirdgray w-[90%] leading-[1em] mt-[1rem]">We translate Solana’s technical data into a language you can actually use. Every event, account, and transfer explained with context and clarity.</p>
                      <div className="mt-[1rem]">
                        <CTAButton title="Analyze" />
                      </div>
                    </div>
                  </div>
                </motion.div>
                 <motion.div
                  whileHover={{
                    scale: 1.04
                  }}
                  transition={{
                    duration: 0.3
                  }}

                  className="h-[55%]  rounded-md border-[1px] border-secondary">
                  <div className="w-full h-[50%] bg-[url('/img/landing/dashboard.jpeg')] bg-cover bg-center overflow-hidden ">
                    {/* <img */}
                    {/* src="/img/landing/devices.jpg"
                      alt="devices" */}
                    {/* className="w-full h-full object-cover" */}
                    {/* /> */}
                  </div>

                  <div className="h-[50%] w-full flex justify-center items-center">
                    <div className="w-[90%] h-[90%]">
                      <h1 className="text-sm text-cryptonite">Insight</h1>
                      <h1 className="text-2xl font-semibold">Unified Dashboard</h1>
                      <p className="text-xs font-light text-thirdgray w-[90%] leading-[1em] mt-[1rem]">Gain a unified snapshot of all your token contracts and connected communities. Track performance and monitor engagement effortlessly through a clean, data-driven interface that keeps you in sync with real-time insights.</p>
                      <div className="mt-[1rem]">
                        <CTAButton title="Access" />
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{
                    scale: 1.04
                  }}
                  transition={{
                    duration: 0.3
                  }} className="h-[45%] rounded-md border-[1px] border-secondary flex flex-col justify-center">
                  <div className="h-[50%] w-full flex justify-center items-center">
                    <div className="w-[90%] h-[90%]">
                      {/* <h1 className="text-sm text-cryptonite">Instant</h1> */}
                      <h1 className="text-2xl font-semibold">Asset Locking</h1>
                      <p className="text-xs font-light text-thirdgray w-[90%] leading-[1em] mt-[1rem]">Protect your tokens with confidence using Chaincast’s secure locking system. Ideal for team allocations, liquidity locks, or long-term holdings offering complete transparency and reliable security for your assets.</p>
                      <div className="mt-[1rem]">
                        <CTAButton title="Lock" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="flex flex-col gap-[1.5rem] h-full">
                <motion.div
                  whileHover={{
                    scale: 1.04
                  }}
                  transition={{
                    duration: 0.3
                  }}
                  className="h-[45%] rounded-md border-[1px] border-secondary flex flex-col justify-center">
                  <div className="h-[50%] w-full flex justify-center items-center">
                    <div className="w-[90%] h-[90%]">
                      {/* <h1 className="text-sm text-cryptonite">Instant</h1> */}
                      <h1 className="text-2xl font-semibold">No more frontend polling required</h1>
                      <p className="text-xs font-light text-thirdgray w-[90%] leading-[1em] mt-[1rem]">Eliminate constant polling to check transaction status. Get instant, reliable updates the moment your transaction is confirmed.</p>
                      <div className="mt-[1rem]">
                        <CTAButton title="Discover" />
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{
                    scale: 1.04
                  }}
                  transition={{
                    duration: 0.3
                  }} className="h-[55%] rounded-md border-[1px] overflow-hidden border-secondary">
                  <div className="w-full h-[50%] bg-[url('/img/landing/nft.jpg')] bg-cover bg-center overflow-hidden">
                    {/* <img src="/img/landing/nft.jpg" alt="" className="w-full h-full object-cover" /> */}
                  </div>
                  <div className="h-[50%] w-full flex justify-center items-center">
                    <div className="w-[90%] h-[90%]">
                      <h1 className="text-sm text-cryptonite">NFT-Ready</h1>
                      <h1 className="text-2xl font-semibold">Detect NFT Mints, Transfers & Sales</h1>
                      <p className="text-xs font-light text-thirdgray w-[90%] leading-[1em] mt-[1rem]">Receive instant notifications for NFT mints, marketplace trades, and transfers. Keep your NFT analytics, marketplaces, and dashboards in perfect sync with Solana activity.</p>
                      <div className="mt-[1rem]">
                        <CTAButton title="Mint" />
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{
                    scale: 1.04
                  }}
                  transition={{
                    duration: 0.3
                  }}
                  className="h-[45%] rounded-md border-[1px] border-secondary flex flex-col justify-center">
                  <div className="h-[50%] w-full flex justify-center items-center">
                    <div className="w-[90%] h-[90%]">
                      {/* <h1 className="text-sm text-cryptonite">Instant</h1> */}
                      <h1 className="text-2xl font-semibold">Token Airdrops</h1>
                      <p className="text-xs font-light text-thirdgray w-[90%] leading-[1em] mt-[1rem]">Distribute tokens effortlessly to boost your project’s reach and strengthen community connections. Upload CSV files or target existing holder groups with just a few clicks for quick and efficient token delivery.</p>
                      <div className="mt-[1rem]">
                        <CTAButton title="Distribute" />
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{
                    scale: 1.04
                  }}
                  transition={{
                    duration: 0.3
                  }} className="h-[55%] rounded-md border-[1px] overflow-hidden border-secondary">
                  <div className="w-full h-[50%] bg-[url('/img/landing/payments.jpg')] bg-cover bg-center overflow-hidden">
                    {/* <img src="/img/landing/nft.jpg" alt="" className="w-full h-full object-cover" /> */}
                  </div>
                  <div className="h-[50%] w-full flex justify-center items-center">
                    <div className="w-[90%] h-[90%]">
                      <h1 className="text-sm text-cryptonite">Automate</h1>
                      <h1 className="text-2xl font-semibold">Stream Payments</h1>
                      <p className="text-xs font-light text-thirdgray w-[90%] leading-[1em] mt-[1rem]">Simplify payouts and onboarding with automated, programmable payment streams. Set schedules like weekly, bi-weekly, or monthly, or enable instant withdrawals for complete financial flexibility and control.</p>
                      <div className="mt-[1rem]">
                        <CTAButton title="Stream" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="flex flex-col gap-[1.5rem] h-full">
                <motion.div
                  whileHover={{
                    scale: 1.04
                  }}
                  transition={{
                    duration: 0.3
                  }} className="h-[55%] rounded-md border-[1px] overflow-hidden border-secondary ">
                  <div className="w-full h-[50%] bg-[url('/img/landing/apps.jpg')] bg-cover bg-center overflow-hidden">
                    {/* <img src="/img/landing/apps.jpg" alt="" className="w-full h-full object-cover" /> */}
                  </div>
                  <div className="h-[50%] w-full flex justify-center items-center">
                    <div className="w-[90%] h-[90%]">
                      <h1 className="text-sm text-cryptonite">Notifications</h1>
                      <h1 className="text-2xl font-semibold">Get alerts on your favorite apps</h1>
                      <p className="text-xs font-light text-thirdgray w-[90%] leading-[1em] mt-[1rem]">Receive instant notifications through Telegram, Whatsapp, Discord, and email.</p>
                      <div className="mt-[1rem]">
                        <CTAButton title="Get Notified" />
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div whileHover={{
                  scale: 1.04
                }}
                  transition={{
                    duration: 0.3
                  }} className="h-[45%] rounded-md border-[1px] border-secondary flex flex-col justify-center">
                  <div className="h-[50%] w-full flex justify-center items-center">
                    <div className="w-[90%] h-[90%]">
                      
                      <h1 className="text-2xl font-semibold">Watch for Incoming Payments</h1>
                      <p className="text-xs font-light text-thirdgray w-[90%] leading-[1em] mt-[1rem]">Track deposits and withdrawals to any wallet in real time. Perfect for payment gateways, dApps, or analytics dashboards that rely on live wallet activity.</p>
                      <div className="mt-[1rem]">
                        <CTAButton title="Watch" />
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{
                    scale: 1.04
                  }}
                  transition={{
                    duration: 0.3
                  }} className="h-[55%] rounded-md border-[1px] overflow-hidden border-secondary ">
                  <div className="w-full h-[50%] bg-[url('/img/landing/token.jpg')] bg-cover bg-center overflow-hidden">
                    {/* <img src="/img/landing/apps.jpg" alt="" className="w-full h-full object-cover" /> */}
                  </div>
                  <div className="h-[50%] w-full flex justify-center items-center">
                    <div className="w-[90%] h-[90%]">
                      <h1 className="text-sm text-cryptonite">Mint</h1>
                      <h1 className="text-2xl font-semibold">Token Creation</h1>
                      <p className="text-xs font-light text-thirdgray w-[90%] leading-[1em] mt-[1rem]">Design, configure, and mint tokens effortlessly. Define custom attributes and mint batches in seconds seamlessly integrating your tokens into the ecosystem and empowering your project’s next growth phase.</p>
                      <div className="mt-[1rem]">
                        <CTAButton title="Mint" />
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div whileHover={{
                  scale: 1.04
                }}
                  transition={{
                    duration: 0.3
                  }} className="h-[45%] rounded-md border-[1px] border-secondary flex flex-col justify-center">
                  <div className="h-[50%] w-full flex justify-center items-center">
                    <div className="w-[90%] h-[90%]">
                      <h1 className="text-2xl font-semibold">Vesting Management</h1>
                      <p className="text-xs font-light text-thirdgray w-[90%] leading-[1em] mt-[1rem]">Manage token vesting schedules with precision and ease. Automate stakeholder distributions, set flexible unlock timelines, and enable transferable or claimable payments to keep everything running smoothly.</p>
                      <div className="mt-[1rem]">
                        <CTAButton title="Unlock" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full h-[75dvh] font-light bg-gradient-to-b from-black via-black to-cryptonite/10">
          <div className="w-full h-[75%] flex justify-center items-center bg--300">
            <h1 className="text-8xl font-semibold bg-gradient-to-b from-greenStart via-greenEnd to-black bg-clip-text text-transparent">thrive10xChainCast</h1>
          </div>
          <div className="w-full h-[4rem] flex flex-col items-center justify-center text-cryptonite">
            <div className="h-[1px] w-[90%] bg-mainwhite"></div>
            <div className="w-[90%] flex justify-between mt-[2rem]">
              <div>
                <h1>© 2024 chaincast.thrive10xlabs.in. All rights reserved.</h1>
              </div>
              <div className="flex gap-[1rem]">
                <a href="https://x.com/Monk999xDev" target="_blank" rel="noopener noreferrer">X</a>
                <a href="https://github.com/chiraggowda92187" target="_blank" rel="noopener noreferrer">Github</a>
                <a href="https://chirag.thrive10xlabs.in/" target="_blank" rel="noopener noreferrer">About Me</a>
                <a href="">Terms of Service</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}


