'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { Ripple } from '@/components/ui/background-ripple-effect'
import { AiOutlineCloudServer } from "react-icons/ai"
import { CiServer } from "react-icons/ci"
import { FaDatabase, FaShieldAlt, FaNetworkWired, FaRocket, FaCheckCircle } from "react-icons/fa"
import { MdStorage, MdSpeed } from "react-icons/md"
import { FiMapPin } from "react-icons/fi"
import Navbar from '@/app/components/Navbar'
import { Footer } from '@/app/components/Footer'
import regionsData from '@/app/json/infrastructure/regions.json'
import roadmapData from '@/app/json/infrastructure/roadmap.json'
const iconMap: Record<string, React.ReactNode> = {
    'AiOutlineCloudServer': <AiOutlineCloudServer className="w-6 h-6" />,
    'CiServer': <CiServer className="w-6 h-6" />,
    'FaRocket': <FaRocket className="w-6 h-6" />
}

const roadmapItems = roadmapData.map(item => ({
    ...item,
    icon: iconMap[item.icon] || <AiOutlineCloudServer className="w-6 h-6" />
}))

export default function InfrastructurePage() {
    const [selectedRegion, setSelectedRegion] = useState(0)

    return (
        <>
            <Navbar />
            <div className="relative w-full min-h-screen px-4 py-8 sm:py-12 md:py-16">
            <section id="data-centers" className="relative z-10 max-w-7xl mx-auto mb-16 sm:mb-24">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Global <span className="text-accent">Infrastructure</span>
                    </h2>
                    <p className="text-sm sm:text-base text-muted mb-8 max-w-3xl">
                        Our infrastructure is strategically deployed across the globe to ensure low-latency access and high availability for your applications. Each region is equipped with the latest hardware and connected to multiple tier-1 providers.
                    </p>
                </motion.div>

                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-4"
                >
                    <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">Select Region:</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
                        {regionsData.map((region, index) => (
                            <motion.button
                                key={index}
                                onClick={() => setSelectedRegion(index)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`relative p-3 rounded-xl border transition-all ${
                                    selectedRegion === index
                                        ? 'border-muted bg-card '
                                        : 'border-muted hover:border-accent'
                                } ${region.status === 'coming-soon' ? 'opacity-60' : ''}`}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <div className="flex items-center gap-2 w-full">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                            <Image
                                                src={region.flag}
                                                alt={`${region.country} flag`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="text-left flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-foreground truncate">{region.name}</p>
                                            <p className="text-xs text-muted truncate">{region.country}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                
                <motion.div
                    key={selectedRegion}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative rounded-xloverflow-hidden"
                >
                    <Ripple />
                    <div className="relative z-20 border p-6 rounded-xl border-muted">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                <Image
                                    src={regionsData[selectedRegion].flag}
                                    alt={`${regionsData[selectedRegion].country} flag`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                                    {regionsData[selectedRegion].name}, {regionsData[selectedRegion].country}
                                </h3>
                            </div>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-accent">
                                    <CiServer className="w-5 h-5" />
                                    <h4 className="font-semibold">Processor</h4>
                                </div>
                                <p className="text-foreground font-medium">{regionsData[selectedRegion].specs.processor}</p>
                                <p className="text-sm text-muted">{regionsData[selectedRegion].specs.cores} • {regionsData[selectedRegion].specs.boost}</p>
                            </div>


                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-accent">
                                    <MdStorage className="w-5 h-5" />
                                    <h4 className="font-semibold">Memory</h4>
                                </div>
                                <p className="text-foreground font-medium">{regionsData[selectedRegion].specs.memory}</p>
                                <p className="text-sm text-muted">ECC Memory for data integrity</p>
                            </div>


                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-accent">
                                    <FaDatabase className="w-5 h-5" />
                                    <h4 className="font-semibold">Storage</h4>
                                </div>
                                <p className="text-foreground font-medium">{regionsData[selectedRegion].specs.storage}</p>
                                <p className="text-sm text-muted">RAID</p>
                            </div>


                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-accent">
                                    <FaNetworkWired className="w-5 h-5" />
                                    <h4 className="font-semibold">Network</h4>
                                </div>
                                <p className="text-foreground font-medium">{regionsData[selectedRegion].specs.network}</p>
                                <p className="text-sm text-muted">Multi-homed network with redundant connections</p>
                            </div>


                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-accent">
                                    <MdSpeed className="w-5 h-5" />
                                    <h4 className="font-semibold">Power Efficiency</h4>
                                </div>
                                <p className="text-foreground font-medium">{regionsData[selectedRegion].specs.tdp}</p>
                                <p className="text-sm text-muted">Optimized for performance per watt</p>
                            </div>
                        </div>


                        <div className="border-t border-muted pt-6">
                            <h4 className="text-xl font-bold text-foreground mb-4">Network Details</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                                <div>
                                    <p className="text-sm text-accent mb-2">Upstream Providers</p>
                                    <div className="space-y-1">
                                        {regionsData[selectedRegion].network.providers.map((provider, idx) => (
                                            <p key={idx} className="text-foreground font-medium">{provider}</p>
                                        ))}
                                    </div>
                                </div>


                                <div>
                                    <p className="text-sm text-accent mb-2">Latency</p>
                                    <div className="space-y-1">
                                        <p className="text-sm"><span className="text-muted">US:</span> <span className="text-foreground font-medium">{regionsData[selectedRegion].network.latency.us}</span></p>
                                        <p className="text-sm"><span className="text-muted">Europe:</span> <span className="text-foreground font-medium">{regionsData[selectedRegion].network.latency.europe}</span></p>
                                        <p className="text-sm"><span className="text-muted">Asia:</span> <span className="text-foreground font-medium">{regionsData[selectedRegion].network.latency.asia}</span></p>
                                    </div>
                                </div>

                                
                                <div id="ddos-protection">
                                    <p className="text-sm text-accent mb-2">DDoS Protection</p>
                                    <p className="text-foreground font-medium mb-1">17Tbps Mitigation Capacity</p>
                                    <p className="text-xs text-muted">Multi-layered protection against L3-L7 attacks</p>
                                </div>

                                
                                <div id="network">
                                    <p className="text-sm text-accent mb-2">Connectivity</p>
                                    <p className="text-foreground font-medium mb-1">Direct peering with major networks</p>
                                    <p className="text-xs text-muted">Optimized routes to minimize latency and packet loss</p>
                                </div>
                            </div>
                        </div>

                        {/* Datacenter Details Section */}
                        {regionsData[selectedRegion].datacenter && regionsData[selectedRegion].status === 'active' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="border-t border-muted pt-6 mt-6"
                            >
                                <h4 className="text-xl font-bold text-foreground mb-6">Datacenter Details</h4>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Left Side - Location and Certifications */}
                                    <div className="space-y-6">
                                        {/* Location */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-accent">
                                                <FiMapPin className="w-5 h-5" />
                                                <h5 className="font-semibold text-lg">Location</h5>
                                            </div>
                                            <p className="text-foreground text-sm pl-7">
                                                {regionsData[selectedRegion].datacenter.location}
                                            </p>
                                        </div>

                                        {/* Certifications */}
                                        {regionsData[selectedRegion].datacenter.certifications && 
                                         regionsData[selectedRegion].datacenter.certifications.length > 0 && (
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 text-accent">
                                                    <FaCheckCircle className="w-5 h-5" />
                                                    <h5 className="font-semibold text-lg">Certifications</h5>
                                                </div>
                                                <div className="flex flex-wrap gap-3 pl-7">
                                                    {regionsData[selectedRegion].datacenter.certifications.map((cert, idx) => (
                                                        <motion.span
                                                            key={idx}
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                                                            className="px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 dark:text-green-300 rounded-lg text-sm font-medium shadow-sm hover:bg-green-500/20 hover:border-green-500/50 transition-all"
                                                        >
                                                            {cert}
                                                        </motion.span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right Side - Datacenter Image */}
                                    {regionsData[selectedRegion].datacenter.image && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 0.4 }}
                                            className="relative rounded-xl overflow-hidden border border-muted"
                                        >
                                            <div className="relative w-full h-64 lg:h-full min-h-[300px]">
                                                <Image
                                                    src={regionsData[selectedRegion].datacenter.image}
                                                    alt={`${regionsData[selectedRegion].name} Datacenter`}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <p className="text-white font-semibold text-sm">
                                                        {regionsData[selectedRegion].name} Datacenter Facility
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </section>

            <section id="storage-architecture" className="relative z-10 max-w-7xl mx-auto mb-16 sm:mb-24">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Ceph Storage <span className="text-accent">Architecture</span>
                    </h2>
                    <p className="text-sm sm:text-base text-muted mb-8 max-w-3xl">
                        Our distributed storage system provides unmatched reliability, performance, and scalability for all your data needs. Each region uses localized Ceph nodes for redundancy and speed.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {[
                        {
                            title: 'Distributed Storage',
                            description: 'Ceph is a distributed storage system that provides object, block, and file storage in a unified platform. It\'s designed to be self-healing and self-managing, with no single point of failure.'
                        },
                        {
                            title: 'NVMe Performance',
                            description: 'Our Ceph clusters use NVMe SSDs for both the journal and data storage, providing exceptional performance with read/write speeds up to 7000MB/s and sub-millisecond latency.'
                        },
                        {
                            title: 'Automatic Replication',
                            description: 'Data is automatically replicated across multiple nodes, ensuring high availability and durability. If a node fails, data is automatically recovered from replicas.'
                        },
                        {
                            title: 'Data Protection',
                            description: 'Our Ceph implementation uses erasure coding and checksums to protect against data corruption, ensuring the integrity of your data at all times.'
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="relative rounded-xl overflow-hidden"
                        >
                            <div className="relative z-20 ">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-lg text-primary  text-foreground">{item.title}</h3>
                                </div>
                                <p className="text-sm text-muted">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            
            <section id="roadmap" className="relative z-10 max-w-7xl mx-auto mb-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Future <span className="text-accent">Roadmap</span>
                    </h2>
                    <p className="text-sm sm:text-base text-muted mb-8 max-w-3xl">
                        We&apos;re constantly expanding our infrastructure and upgrading our hardware to provide you with the best possible hosting experience. Here&apos;s a glimpse of what&apos;s coming next.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {roadmapItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative"
                        >
                            
                            {index !== roadmapItems.length - 1 && (
                                <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-accent/50 to-transparent hidden md:block" />
                            )}

                            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                                
                                <div className="flex items-start gap-4 md:gap-0 md:flex-col md:items-center">
                                    <div className="relative">
                                        <div className="p-3 rounded-xl bg-card text-accent border-2 border-accent group-hover:border-accent group-hover:bg-accent/20 transition-all duration-300">
                                            {item.icon}
                                        </div>
                                    </div>
                                    <span className="md:hidden text-xs px-3 py-1 bg-accent/20 text-accent rounded-full font-medium self-start mt-1">
                                        {item.type}
                                    </span>
                                </div>

                                
                                <div className="flex-1 pb-8 md:pb-4">
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <span className="hidden md:inline-block text-xs px-3 py-1 bg-accent/20 text-accent rounded-full font-medium">
                                            {item.type}
                                        </span>
                                        <span className="text-xs text-accent/80 font-semibold">
                                            {item.expected}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-muted leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
        <Footer />
        </>
    )
}
