# AI Infrastructure Basics: What Every Platform Engineer Needs to Know

You don't need to be an ML engineer to work on AI infrastructure. But you do need to understand the infrastructure requirements that make ML workloads different from web services.

## Why AI Workloads Are Different

Traditional web services: stateless, horizontally scalable, CPU-bound, milliseconds latency.
AI training workloads: stateful (checkpoints), vertically specialized (GPUs), communication-bound (inter-GPU bandwidth), hours-to-days duration.

This difference changes everything about how you architect the supporting infrastructure.

## GPU Clusters: The Physical Layer

**H100 vs A100**: H100 (Hopper architecture) delivers ~3x the training throughput of A100 for large language models due to FP8 support and NVLink 4.0. For platform engineers, the key is: H100 clusters are more expensive to provision correctly, require NVSwitch topology awareness, and have different cooling requirements.

**NVLink vs InfiniBand**: Within a single node, GPUs communicate via NVLink (ultra-high bandwidth, ~900 GB/s for H100 NVSwitch). Across nodes, the standard is InfiniBand (400 Gb/s HDR or 800 Gb/s NDR). Getting network topology wrong is the #1 cause of training job performance degradation.

**NUMA awareness**: GPU memory is not uniform. Pinning CPU workers to NUMA nodes closest to the GPUs they serve can improve data loading throughput by 30-50%.

## Distributed Training: The Software Layer

**Data Parallelism**: Each GPU has a full model copy, sees a different mini-batch. Gradients are averaged across GPUs after each step (AllReduce via NCCL). Simple to implement, scales well for most model sizes.

**Tensor/Model Parallelism**: For models too large for one GPU, split the model itself across GPUs. Requires careful sharding strategy. Megatron-LM and DeepSpeed handle this. Platform engineers rarely implement this — but they need to provision the right interconnect topology for it to work.

**NCCL (NVIDIA Collective Communications Library)**: The library that runs AllReduce, AllGather, and Broadcast operations across GPUs. Misconfigured NCCL is the most common source of "training is slow" tickets that platform teams receive. Key env vars: `NCCL_DEBUG`, `NCCL_SOCKET_IFNAME`, `NCCL_IB_GID_INDEX`.

## Kubernetes for ML: Key Differences

**Job scheduling**: ML training uses `Job` or `MPIJob` (via Kubeflow), not `Deployment`. Jobs need GPU resource requests, tolerations for GPU nodes, and often priority classes.

**Storage**: Training data is large (TB-scale). Options: mounting object storage (GCS/S3) via CSI driver, network filesystems (NFS, Lustre), or local NVMe for hot data. Throughput matters more than IOPS for most training jobs.

**Checkpointing**: Long training jobs checkpoint every N steps. Platform teams need to provision fast shared storage that multiple pods can write to simultaneously without corruption.

## Interview Tips

If asked about AI infrastructure, structure your answer as:
1. What layer are we talking about? (hardware / networking / compute orchestration / storage / monitoring)
2. What's the scale? (single GPU / single node / multi-node / multi-cluster)
3. What's the bottleneck? (compute / memory / network / storage)

This framework works for both "design a training cluster" and "debug a slow training job."
