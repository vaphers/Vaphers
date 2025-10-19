'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Mail, Phone, MapPin, Globe, Twitter, Instagram, Dribbble, Linkedin } from 'lucide-react'

const ContactForm: React.FC = () => {
  return (
    <section className="py-16 px-4 flex flex-col md:flex-row gap-10 max-w-7xl mx-auto w-full">
      {/* Left contact info */}
      <div className="flex-1">
          <h4 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl text-center sm:text-start  font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
            Get A Free Consultation
          </h4>        
          <p className="text-lg text-muted-foreground mb-10">
          Have a project in mind or just want to say hello? I&apos;d love to hear from you.
        </p>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
          <p className="mb-6 text-muted-foreground">Feel free to reach out through any of these channels.</p>
          
          <div className="mb-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                <Mail className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <span className="font-medium block">Email</span>
                <div className="text-muted-foreground text-sm">vaphersonline@gmail.com</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                <Phone className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <span className="font-medium block">Phone</span>
                <div className="text-muted-foreground text-sm">+91-9641861932</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <span className="font-medium block">Location</span>
                <div className="text-muted-foreground text-sm">Kolkata, India</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <span className="font-semibold text-xl block mb-3">Connect</span>
          <div className="flex gap-3">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors">
              <Globe className="w-5 h-5 text-gray-600 hover:text-blue-600" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors">
              <Twitter className="w-5 h-5 text-gray-600 hover:text-blue-600" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-pink-100 flex items-center justify-center transition-colors">
              <Instagram className="w-5 h-5 text-gray-600 hover:text-pink-600" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors">
              <Linkedin className="w-5 h-5 text-gray-600 hover:text-blue-600" />
            </a>
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1">
        <Card className="max-w-full rounded-xl shadow-sm">
          <CardContent className="py-8 px-6">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium mb-2 block">First name</label>
                <Input type="text" placeholder="Your first name" />
              </div>
              <div>
                <label className="font-medium mb-2 block">Last name</label>
                <Input type="text" placeholder="Your last name" />
              </div>
              <div className="md:col-span-2">
                <label className="font-medium mb-2 block">Email</label>
                <Input type="email" placeholder="youremail@domain.com" />
              </div>
              <div className="md:col-span-2">
                <label className="font-medium mb-2 block">Website</label>
                <Input type="url" placeholder="www.yourwebsite.com" />
              </div>
              <div className="md:col-span-2">
                <label className="font-medium mb-2 block">Service</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select the service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="audit">Website Audit (Free)</SelectItem>
                    <SelectItem value="seo">Search Engine Optimization</SelectItem>
                    <SelectItem value="ppc">Pay Per Click (Paid Ads)</SelectItem>
                    <SelectItem value="smo">Social Media Optimization</SelectItem>
                    <SelectItem value="webdev">Website Development</SelectItem>
                    <SelectItem value="appdev">App Development</SelectItem>
                    <SelectItem value="custom">Custom Softwares</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <label className="font-medium mb-2 block">Message</label>
                <Textarea placeholder="Your message" rows={4} />
              </div>
              <div className="md:col-span-2">
                <Button className="w-full mt-2 rounded-lg px-6 bg-blue-600">
                  Send Message
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default ContactForm
