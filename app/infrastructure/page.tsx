'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Ripple } from '@/components/ui/background-ripple-effect'
import { AiOutlineCloudServer } from "react-icons/ai"
import { CiServer } from "react-icons/ci"
import { FaDatabase, FaShieldAlt, FaNetworkWired, FaRocket } from "react-icons/fa"
import { MdStorage, MdSpeed } from "react-icons/md"
import Navbar from '@/app/components/Navbar'
import { Footer } from '@/app/components/Footer'

const regions = [
    {
        name: 'Phoenix',
        country: 'United States',
        flag: '/flags/usa.png',
        emoji: '🇺🇸',
        status: 'active',
        specs: {
            processor: 'Dual Intel Xeon E5-2697v4',
            cores: '36 Cores / 72 Threads',
            boost: '3.6 GHz Boost',
            memory: '512GB DDR4-3200',
            storage: '2x4TB SSD RAID',
            network: '10Gbps',
            tdp: '290W TDP'
        },
        network: {
            providers: ['Path.net'],
            latency: {
                us: '< 20ms',
                europe: '90-110ms',
                asia: '150-180ms'
            }
        }
    },
    {
        name: 'NewYork',
        country: 'United States',
        flag: '/flags/usa.png',
        emoji: '🇺🇸',
        status: 'active',
        specs: {
            processor: 'Dual Intel Xeon E5-2697v4',
            cores: '36 Cores / 72 Threads',
            boost: '3.6 GHz Boost',
            memory: '512GB DDR4-3200',
            storage: '2x4TB SSD RAID',
            network: '10Gbps',
            tdp: '290W TDP'
        },
        network: {
            providers: ['Path.net'],
            latency: {
                us: '< 20ms',
                europe: '80-100ms',
                asia: '160-190ms'
            }
        }
    },
    {
        name: 'Frankfurt',
        country: 'Germany',
        flag: '/flags/germany.png',
        emoji: '🇩🇪',
        status: 'active',
        specs: {
            processor: 'Dual Intel Xeon E5-2697v4',
            cores: '36 Cores / 72 Threads',
            boost: '3.6 GHz Boost',
            memory: '512GB DDR4-3200',
            storage: '2x4TB SSD RAID',
            network: '10Gbps',
            tdp: '290W TDP'
        },
        network: {
            providers: ['Path.net'],
            latency: {
                us: '90-110ms',
                europe: '< 20ms',
                asia: '140-170ms'
            }
        }
    },
    {
        name: 'Johor',
        country: 'Malaysia',
        flag: '/flags/malaysia.png',
        emoji: '🇲🇾',
        status: 'active',
        specs: {
            processor: 'Dual Intel Xeon E5-2697v4',
            cores: '36 Cores / 72 Threads',
            boost: '3.6 GHz Boost',
            memory: '512GB DDR4-3200',
            storage: '2x4TB SSD RAID',
            network: '10Gbps',
            tdp: '290W TDP'
        },
        network: {
            providers: ['Path.net'],
            latency: {
                us: '150-180ms',
                europe: '140-170ms',
                asia: '< 20ms'
            }
        }
    },
    {
        name: 'Hong Kong',
        country: 'China',
        flag: '/flags/chinese.png',
        emoji: '🇭🇰',
        status: 'active',
        specs: {
            processor: 'Dual Intel Xeon E5-2697v4',
            cores: '36 Cores / 72 Threads',
            boost: '3.6 GHz Boost',
            memory: '512GB DDR4-3200',
            storage: '2x4TB SSD RAID',
            network: '10Gbps',
            tdp: '290W TDP'
        },
        network: {
            providers: ['Path.net'],
            latency: {
                us: '160-190ms',
                europe: '150-180ms',
                asia: '< 20ms'
            }
        }
    },
    {
        name: 'Singapore',
        country: 'Singapore',
        flag: '/flags/singapore.png',
        emoji: '🇸🇬',
        status: 'active',
        specs: {
            processor: 'Dual Intel Xeon E5-2697v4',
            cores: '36 Cores / 72 Threads',
            boost: '3.6 GHz Boost',
            memory: '512GB DDR4-3200',
            storage: '2x4TB SSD RAID',
            network: '10Gbps',
            tdp: '290W TDP'
        },
        network: {
            providers: ['Path.net'],
            latency: {
                us: '150-180ms',
                europe: '140-170ms',
                asia: '< 20ms'
            }
        }
    },
    {
        name: 'Mumbai',
        country: 'India',
        flag: '/flags/india.png',
        emoji: '🇮🇳',
        status: 'coming-soon',
        specs: {
            processor: 'TBA',
            cores: 'TBA',
            boost: 'TBA',
            memory: 'TBA',
            storage: 'TBA',
            network: 'TBA',
            tdp: 'TBA'
        },
        network: {
            providers: ['TBA'],
            latency: {
                us: 'TBA',
                europe: 'TBA',
                asia: 'TBA'
            }
        }
    }
]

const vpsSeries = [
    {
        name: 'Zenith Series',
        recommended: true,
        processor: 'AMD Ryzen 9 9950X',
        cores: '16 Cores / 32 Threads',
        memory: 'DDR5-6400',
        storage: 'NVMe (7000MB/s)',
        pricing: 'From $20/mo',
        useCases: ['High-performance applications', 'Database servers', 'AI/ML workloads']
    },
    {
        name: 'Eclipse Series',
        recommended: false,
        processor: 'Dual Intel Xeon E5-2697v4',
        cores: '36 Cores / 72 Threads',
        memory: 'DDR4-3200',
        storage: 'NVMe (3500MB/s)',
        pricing: 'From $15/mo',
        useCases: ['Multi-threaded applications', 'Web servers', 'Containerized workloads']
    },
    {
        name: 'Nova Series',
        recommended: false,
        comingSoon: true,
        processor: 'AMD EPYC 9654',
        cores: '96 Cores / 192 Threads',
        memory: 'DDR5-6400',
        storage: 'NVMe (7000MB/s)',
        pricing: 'From $40/mo',
        useCases: ['Enterprise applications', 'Large-scale databases', 'High-density computing']
    }
]

const roadmapItems = [
    {
        type: 'Region',
        title: 'Mumbai, India Data Center',
        description: 'New data center in Mumbai to serve the growing Indian market with low-latency connections.',
        expected: 'Q4 2025',
        icon: <AiOutlineCloudServer className="w-6 h-6" />
    },
    {
        type: 'Hardware',
        title: 'AMD EPYC 9000 series Deployment',
        description: 'Introducing our Nova Series powered by AMD EPYC 9000 processors with upto 96 cores and 192 threads for enterprise workloads.',
        expected: 'Q4 2026',
        icon: <CiServer className="w-6 h-6" />
    },
    {
        type: 'Region',
        title: 'São Paulo, Brazil Data Center',
        description: 'Expanding to South America with a new data center in São Paulo, Brazil.',
        expected: 'Q4 2026',
        icon: <AiOutlineCloudServer className="w-6 h-6" />
    },
    {
        type: 'Service',
        title: 'FiveM Servers',
        description: 'Expanding our footprint to FiveM hosting to serve the evergrowing demand',
        expected: 'Q4 2025',
        icon: <FaRocket className="w-6 h-6" />
    },
    {
        type: 'Region',
        title: 'Sydney, Australia Data Center',
        description: 'New data center in Sydney to better serve customers in Australia and Oceania.',
        expected: 'Q1 2025',
        icon: <AiOutlineCloudServer className="w-6 h-6" />
    }
]

export default function InfrastructurePage() {
    const [selectedRegion, setSelectedRegion] = useState(0)

    return (
        <>
            <Navbar />
            <div className="relative w-full min-h-screen px-4 py-8 sm:py-12 md:py-16">
            <section id="global-regions" className="relative z-10 max-w-7xl mx-auto mb-16 sm:mb-24">
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

                {/* Region Selector */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-4"
                >
                    <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">Select Region:</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
                        {regions.map((region, index) => (
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

                {/* Region Details Card */}
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
                                    src={regions[selectedRegion].flag}
                                    alt={`${regions[selectedRegion].country} flag`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                                    {regions[selectedRegion].name}, {regions[selectedRegion].country}
                                </h3>
                            </div>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {/* Processor */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-accent">
                                    <CiServer className="w-5 h-5" />
                                    <h4 className="font-semibold">Processor</h4>
                                </div>
                                <p className="text-foreground font-medium">{regions[selectedRegion].specs.processor}</p>
                                <p className="text-sm text-muted">{regions[selectedRegion].specs.cores} • {regions[selectedRegion].specs.boost}</p>
                            </div>

                            {/* Memory */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-accent">
                                    <MdStorage className="w-5 h-5" />
                                    <h4 className="font-semibold">Memory</h4>
                                </div>
                                <p className="text-foreground font-medium">{regions[selectedRegion].specs.memory}</p>
                                <p className="text-sm text-muted">ECC Memory for data integrity</p>
                            </div>

                            {/* Storage */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-accent">
                                    <FaDatabase className="w-5 h-5" />
                                    <h4 className="font-semibold">Storage</h4>
                                </div>
                                <p className="text-foreground font-medium">{regions[selectedRegion].specs.storage}</p>
                                <p className="text-sm text-muted">RAID</p>
                            </div>

                            {/* Network */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-accent">
                                    <FaNetworkWired className="w-5 h-5" />
                                    <h4 className="font-semibold">Network</h4>
                                </div>
                                <p className="text-foreground font-medium">{regions[selectedRegion].specs.network}</p>
                                <p className="text-sm text-muted">Multi-homed network with redundant connections</p>
                            </div>

                            {/* Power Efficiency */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-accent">
                                    <MdSpeed className="w-5 h-5" />
                                    <h4 className="font-semibold">Power Efficiency</h4>
                                </div>
                                <p className="text-foreground font-medium">{regions[selectedRegion].specs.tdp}</p>
                                <p className="text-sm text-muted">Optimized for performance per watt</p>
                            </div>
                        </div>

                        {/* Network Details */}
                        <div className="border-t border-muted pt-6">
                            <h4 className="text-xl font-bold text-foreground mb-4">Network Details</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Upstream Providers */}
                                <div>
                                    <p className="text-sm text-accent mb-2">Upstream Providers</p>
                                    <div className="space-y-1">
                                        {regions[selectedRegion].network.providers.map((provider, idx) => (
                                            <p key={idx} className="text-foreground font-medium">{provider}</p>
                                        ))}
                                    </div>
                                </div>

                                {/* Latency */}
                                <div>
                                    <p className="text-sm text-accent mb-2">Latency</p>
                                    <div className="space-y-1">
                                        <p className="text-sm"><span className="text-muted">US:</span> <span className="text-foreground font-medium">{regions[selectedRegion].network.latency.us}</span></p>
                                        <p className="text-sm"><span className="text-muted">Europe:</span> <span className="text-foreground font-medium">{regions[selectedRegion].network.latency.europe}</span></p>
                                        <p className="text-sm"><span className="text-muted">Asia:</span> <span className="text-foreground font-medium">{regions[selectedRegion].network.latency.asia}</span></p>
                                    </div>
                                </div>

                                {/* DDoS Protection */}
                                <div>
                                    <p className="text-sm text-accent mb-2">DDoS Protection</p>
                                    <p className="text-foreground font-medium mb-1">17Tbps Mitigation Capacity</p>
                                    <p className="text-xs text-muted">Multi-layered protection against L3-L7 attacks</p>
                                </div>

                                {/* Connectivity */}
                                <div>
                                    <p className="text-sm text-accent mb-2">Connectivity</p>
                                    <p className="text-foreground font-medium mb-1">Direct peering with major networks</p>
                                    <p className="text-xs text-muted">Optimized routes to minimize latency and packet loss</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* VPS Series Section */}
            <section id="vps-series" className="relative z-10 max-w-7xl mx-auto mb-16 sm:mb-24">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                        VPS Series <span className="text-accent">Comparison</span>
                    </h2>
                    <p className="text-sm sm:text-base text-muted mb-8 max-w-3xl">
                        Compare our different VPS series to find the perfect balance of performance, features, and value for your specific needs. All series come with our enterprise-grade network and DDoS protection.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="overflow-x-auto"
                >
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-muted">
                                <th className="text-left p-4 text-sm font-semibold text-muted uppercase tracking-wide">Feature</th>
                                {vpsSeries.map((series, index) => (
                                    <th key={index} className="p-4 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold text-foreground">{series.name}</span>
                                            </div>
                                            <div className="flex flex-wrap justify-center gap-2">
                                                {series.recommended && (
                                                    <span className="px-2 py-1 text-xs bg-accent/20 text-accent rounded-full">
                                                        Recommended
                                                    </span>
                                                )}
                                                {series.comingSoon && (
                                                    <span className="px-2 py-1 text-xs bg-accent/20 text-accent rounded-full">
                                                        Coming Soon
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-muted hover:bg-accent/5 transition-colors">
                                <td className="p-4 text-sm font-medium text-foreground">Pricing</td>
                                {vpsSeries.map((series, index) => (
                                    <td key={index} className="p-4 text-center text-lg font-bold text-accent">
                                        {series.pricing}
                                    </td>
                                ))}
                            </tr>
                            <tr className="border-b border-muted hover:bg-accent/5 transition-colors">
                                <td className="p-4 text-sm font-medium text-foreground">Processor</td>
                                {vpsSeries.map((series, index) => (
                                    <td key={index} className="p-4 text-center text-sm text-muted">
                                        {series.processor}
                                    </td>
                                ))}
                            </tr>
                            <tr className="border-b border-muted hover:bg-accent/5 transition-colors">
                                <td className="p-4 text-sm font-medium text-foreground">Cores / Threads</td>
                                {vpsSeries.map((series, index) => (
                                    <td key={index} className="p-4 text-center text-sm text-muted">
                                        {series.cores}
                                    </td>
                                ))}
                            </tr>
                            <tr className="border-b border-muted hover:bg-accent/5 transition-colors">
                                <td className="p-4 text-sm font-medium text-foreground">Memory</td>
                                {vpsSeries.map((series, index) => (
                                    <td key={index} className="p-4 text-center text-sm text-muted">
                                        {series.memory}
                                    </td>
                                ))}
                            </tr>
                            <tr className="border-b border-muted hover:bg-accent/5 transition-colors">
                                <td className="p-4 text-sm font-medium text-foreground">Storage</td>
                                {vpsSeries.map((series, index) => (
                                    <td key={index} className="p-4 text-center text-sm text-muted">
                                        {series.storage}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="p-4"></td>
                                {vpsSeries.map((_, index) => (
                                    <td key={index} className="p-4 text-center">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-6 py-3 bg-button border border-blue-400/30 text-primary-foreground rounded-lg text-sm font-semibold hover:bg-blue-500/40 transition-colors"
                                        >
                                            View Plans
                                        </motion.button>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
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

            {/* Roadmap Section */}
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
                            {/* Timeline connector line */}
                            {index !== roadmapItems.length - 1 && (
                                <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-accent/50 to-transparent hidden md:block" />
                            )}

                            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                                {/* Icon and Timeline Dot */}
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

                                {/* Content */}
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
