---
title: Deployment Guide
document_id: PET-DOC-1006
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['ci-cd-pipeline.md']
---

# Deployment Guide

Panduan deployment PETORA saat go-live.

## Frontend

Deploy to Vercel or Cloudflare Pages with environment variables; static assets cached appropriately.

## Backend

Supabase migration and edge function deployment occur through CI/CD or approved command sequence with backup and smoke checks.

## Step

Pre-check, run migration, verify schema, deploy app, verify functional smoke tests, then promote to production use.

## Open Decision

Platform target may vary based on hosting preference; current baseline allows Vercel or Cloudflare Pages for frontend.

